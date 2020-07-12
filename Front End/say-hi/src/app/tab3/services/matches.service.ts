import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  baseUrl

  constructor(private http: HttpClient, private platform: Platform) {

    this.baseUrl = (platform.is('hybrid') ? environment.apiVmUrl : environment.apiUrl) + 'users';
  }

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }
}
