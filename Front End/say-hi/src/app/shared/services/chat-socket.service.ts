import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UrlService } from './url.service';

@Injectable()
export class ChatSocketService extends Socket {

  constructor(private urlService: UrlService) {
    
    super({ url: urlService.baseUrl, options: {} });
  }
}