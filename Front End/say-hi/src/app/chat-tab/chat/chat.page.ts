import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUser } from '../models/user.model';
import { MatchesService } from '../services/matches.service';
import { IMessage } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input() match: IUser;
  @Input() userId: string;

  messages;
  message: string = '';

  constructor(
    public modalController: ModalController,
    private service: MatchesService
  ) {}

  ngOnInit() {
    this.service.getMessagesChangedEmitter().subscribe(() => {
      this.messages = this.service.getMessages(this.match.id);
    });
    this.messages = this.service.getMessages(this.match.id);
  }

  dismiss() {
    this.modalController.dismiss({});
  }

  sendMessage() {
    if (this.message && this.message.length > 0) {
      this.service.sendMessage({
        receiver: this.match.id,
        message: this.message,
      });
      this.message = '';
    }
  }
}
