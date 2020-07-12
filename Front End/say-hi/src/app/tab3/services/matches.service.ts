import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }
}
