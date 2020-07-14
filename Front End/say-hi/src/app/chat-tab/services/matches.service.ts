import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user.model';
import { UrlService } from 'src/app/shared/services/url.service';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  baseUrl;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.baseUrl = `${urlService.baseUrl}users`;
  }

  get(id) {
    this.http.get<IUser[]>(`${this.baseUrl}/${id}`).subscribe((res) => {
      console.log('res');
      console.log(res);
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

  getChats(sender, receiver) {
    return this.http.get<IUser[]>(
      `${this.baseUrl}/${sender}/chats/${receiver}`
    );
  }

  post(model: IUser) {
    return this.http.post(this.baseUrl, {
      name: model.name,
      gender: model.gender,
    });
  }

  private matchesChanged: EventEmitter<IUser[]> = new EventEmitter();
  private emitMatchesChangedEvent(matches) {
    this.matchesChanged.emit(matches);
  }

  getMatchesChangedEmitter() {
    return this.matchesChanged;
  }
}
