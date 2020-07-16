import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user.model';
import { UrlService } from 'src/app/shared/services/url.service';
import { IMessage } from '../models/message.model';
import { ChatSocketService } from 'src/app/shared/services/chat-socket.service';

@Injectable()
export class MatchesService {
  baseUrl;
  messages: IMessage[] = [];
  me: IUser;

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
    private socket: ChatSocketService
  ) {
    this.baseUrl = `${urlService.baseUrl}users`;
  }

  init() {
    this.onMessage();
    this.onUserJoined();
    this.userDisconnected();
    this.get(this.me.id);
  }

  get(id) {
    this.http.get<IUser[]>(`${this.baseUrl}/${id}`).subscribe((res) => {
      const matches = res.map(
        (e) => {
          e.avatar = `${this.urlService.baseUrl}${e.avatar}`;
          return e;
        },
        (error) => {
          // todo: Add Error Handling
        }
      );
      this.emitMatchesChangedEvent(matches);
    });
  }

  private matchesChanged: EventEmitter<IUser[]> = new EventEmitter();
  private emitMatchesChangedEvent(matches) {
    this.matchesChanged.emit(matches);
  }

  getMatchesChangedEmitter() {
    return this.matchesChanged;
  }

  getChats(id) {
    return this.http
      .get<IMessage[]>(`${this.baseUrl}/${id}/chats`)
      .subscribe((res) => {
        this.messages = res;
      });
  }

  getMessages(id) {
    console.log('getMessages');
    console.log(this.messages);
    return this.messages.filter((e) => e.sender == id || e.receiver == id);
  }

  private messagesChanged: EventEmitter<void> = new EventEmitter();
  private emitMessagesChangedEvent() {
    this.messagesChanged.emit();
  }

  getMessagesChangedEmitter() {
    return this.messagesChanged;
  }

  post(model: IUser) {
    return this.http.post(this.baseUrl, {
      name: model.name,
      gender: model.gender,
    });
  }

  sendMessage(message) {
    this.socket.emit('message', message, (incomingMessage) => {
      incomingMessage.me = true;
      console.log(incomingMessage);
      this.messages.push(incomingMessage);
      this.emitMessagesChangedEvent();
    });
  }

  onMessage() {
    this.socket.on('message', (message) => {
      console.log('message received');
      console.log(message);
      message.me = false;
      this.messages.push(message);
      this.emitMessagesChangedEvent();
    });
  }

  onUserJoined() {
    this.socket.on('userJoined', () => {
      this.get(this.me.id);
    });
  }

  userDisconnected() {
    this.socket.on('userDisconnected', () => {
      this.get(this.me.id);
    });
  }
}
