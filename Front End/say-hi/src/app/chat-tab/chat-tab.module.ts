import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatTabPage } from './chat-tab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LoginModalPage } from './login-modal/login-modal.page';
import { ChatPage } from './chat/chat.page';
import { ChatTabPageRoutingModule } from './chat-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ChatTabPage }]),

    ChatTabPageRoutingModule,
  ],
  declarations: [ChatTabPage, LoginModalPage, ChatPage],
})
export class ChatTabPageModule {}
