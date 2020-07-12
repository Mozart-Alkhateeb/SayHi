import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatchesService } from './services/matches.service';
import { IUser } from './models/user.model';
import { Platform, ModalController } from '@ionic/angular';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { ChatSocketService } from '../shared/services/chat-socket.service';
import { UrlService } from '../shared/services/url.service';
import { LoginModalPage } from './login-modal/login-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  // todo Add Loading indicator
  matches: IUser[] = [];
  me: IUser;

  constructor(
    public modalController: ModalController,
    private service: MatchesService,
    private urlService: UrlService,
    private socket: ChatSocketService
  ) {}

  ngOnInit(): void {


    this.socket.on('userJoined', ()=>{
      this.refreshMatches();
    });

    this.presentModal();
    this.socket.connect();

    if (this.me) {
      this.refreshMatches();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    this.me = data;
    console.log(this.me);
    this.socket.emit('login', this.me, (user) => {
      this.me = user;
      this.refreshMatches();
    });
  }

  refreshMatches() {
    this.service.get().subscribe((res) => {
      this.matches = res.map((e) => {
        e.avatar = `${this.urlService.baseUrl}${e.avatar}`;
        return e;
      });
      // todo: Add Error Handling
    });
  }
}
