import { Component, OnInit } from '@angular/core';
import { MatchesService } from './services/matches.service';
import { IUser } from './models/user.model';
import { ModalController } from '@ionic/angular';
import { ChatSocketService } from '../shared/services/chat-socket.service';
import { UrlService } from '../shared/services/url.service';
import { LoginModalPage } from './login-modal/login-modal.page';
import { ChatPage } from './chat/chat.page';

@Component({
  selector: 'app-chat-tab',
  templateUrl: 'chat-tab.page.html',
  styleUrls: ['chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {
  // todo Add Loading indicator
  matches: IUser[] = [];
  me: IUser = {
    id: '',
    name: '',
    gender: '',
    avatar: '',
  };

  constructor(
    public modalController: ModalController,
    private service: MatchesService,
    private urlService: UrlService,
    private socket: ChatSocketService
  ) {}

  ngOnInit(): void {
    this.socket.on('userJoined', () => {
      this.refreshMatches();
    });

    if (this.me.id == '') {
      this.presentModal();
    }

    this.socket.connect();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
      backdropDismiss: false,
      swipeToClose: false,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    this.me.name = data.name;
    this.me.gender = data.gender;
    console.log(this.me);

    this.service.post(this.me).subscribe(
      (res) => {
        console.log('post');
        console.log(res);
        this.socket.emit('login', this.me, (user) => {
          this.me = user;
          this.refreshMatches();
          console.log(this.me);
        });
      },
      (error) => {
        // todo: Add Error Handling
      }
    );
  }

  refreshMatches() {
    this.service.get(this.me.id).subscribe((res) => {
      this.matches = res.map(
        (e) => {
          e.avatar = `${this.urlService.baseUrl}${e.avatar}`;
          return e;
        },
        (error) => {
          // todo: Add Error Handling
        }
      );
    });
  }

  async chatClicked(userId) {
    console.log(userId);
    const modal = await this.modalController.create({
      component: ChatPage,
    });

    modal.present();

  }
}
