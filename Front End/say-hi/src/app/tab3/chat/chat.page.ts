import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages =[
    {message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', id: 'me',},
    {message: 'hiasdasdasdasdsad', id: 'he',},
    {message: 'hi bro hru ?', id: 'me',},
    {message: 'hi dadasdkiasdjk', id: 'me',},
    {message: 'hi abc dkdkdk', id: 'he',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit', id: 'he',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi asdsadasddasd', id: 'me',},
    {message: 'hi Lat message', id: 'me',},
  ]
  
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({});
  }
}
