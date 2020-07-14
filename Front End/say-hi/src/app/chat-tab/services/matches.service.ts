import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

import { environment } from 'src/environments/environment';
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

  get(id): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/${id}`);
  }

  post(model: IUser) {
    return this.http.post(this.baseUrl, {
      name: model.name,
      gender: model.gender,
    });
  }
}
