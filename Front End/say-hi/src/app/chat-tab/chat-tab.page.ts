import { Component, OnInit } from '@angular/core';
import { MatchesService } from './services/matches.service';
import { IUser } from './models/user.model';
import { ModalController } from '@ionic/angular';
import { ChatSocketService } from '../shared/services/chat-socket.service';
import { LoginModalPage } from './login-modal/login-modal.page';
import { ChatPage } from './chat/chat.page';

@Component({
  selector: 'app-chat-tab',
  templateUrl: 'chat-tab.page.html',
  styleUrls: ['chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {
  // todo Add Loading indicator
  matches: IUser[];
  me: IUser = {
    id: '',
    name: '',
    gender: '',
    avatar: '',
  };

  constructor(
    public modalController: ModalController,
    public service: MatchesService,
    private socket: ChatSocketService
  ) {}

  ngOnInit(): void {
    // Listen to matches changed event
    this.service.getMatchesChangedEmitter().subscribe((res) => {
      this.matches = res;
    });

    if (this.me.id == '') {
      // No id => not logged in yet
      this.presentModal();
    }

    // Connect to Socket.io
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

    this.service.post(this.me).subscribe(
      (res) => {
        this.socket.emit('login', this.me, (user) => {
          this.me = user;
          this.service.me = this.me;
          // Initialize Socket.io listeners
          this.service.init();
          this.service.getChats(this.me.id);
        });
      },
      (error) => {
        // todo: Add Error Handling
        console.log(error);
      }
    );
  }

  async chatClicked(match) {
    const modal = await this.modalController.create({
      component: ChatPage,
      componentProps: {
        match: match,
        userId: this.me.id,
      },
    });

    modal.present();
  }
}
