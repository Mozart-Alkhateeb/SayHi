import { Component, OnInit } from '@angular/core';
import { ChatPage } from '../tab3/chat/chat.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(public modalController: ModalController) {}
  async ngOnInit() {
    const modal = await this.modalController.create({
      component: ChatPage,
    });

    modal.present();
  }
}
