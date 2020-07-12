import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatchesService } from './services/matches.service';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  // todo Add Loading indicator
  matches: IUser[] = [];

  constructor(private service: MatchesService) {}

  ngOnInit(): void {
    this.service.get().subscribe((res) => {
      this.matches = res.map((e) => {
        e.avatar = `${environment.apiUrl}${e.avatar}`;
        return e;
      });
      // todo: Add Error Handling
    });
  }
}
