import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {
  constructor(public modalController: ModalController) {}
  name: string = '';
  gender: string = 'Male';

  ngOnInit() {}

  login() {
    this.modalController.dismiss({
      name: this.name,
      gender: this.gender,
    });
  }
}
