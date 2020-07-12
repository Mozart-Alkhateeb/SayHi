import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlService {
  constructor(private platform: Platform) {}

  get baseUrl(): string {
    return this.platform.is('hybrid')
      ? environment.apiVmUrl
      : environment.apiUrl;
  }
}
