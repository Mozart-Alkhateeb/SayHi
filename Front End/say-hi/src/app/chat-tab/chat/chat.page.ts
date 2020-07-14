import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUser } from '../models/user.model';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input() match: IUser;

  messages;

  constructor(
    public modalController: ModalController,
    private service: MatchesService
  ) {}

  ngOnInit() {
    this.service.getChats(1, 2).subscribe(
      (res) => {
        this.messages = res;
      },
      (error) => {}
    );
  }

  dismiss() {
    this.modalController.dismiss({});
  }
}
