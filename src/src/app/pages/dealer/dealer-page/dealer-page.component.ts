import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { IPlayerDto } from 'src/app/state/players/players-models';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-dealer-page',
  templateUrl: './dealer-page.component.html',
  styleUrls: ['./dealer-page.component.scss'],
})
export class DealerPageComponent implements OnInit, OnDestroy {
  private sessionSubscription?: Subscription;
  private playersSubscription?: Subscription;

  public activeSession?: ISessionDetailsDto;
  public players?: Array<IPlayerDto>;

  constructor(private store: Store<IAppState>, private router: Router) {}

  public navigateToAttendee() {
    this.router.navigate([`/attendee/${this.activeSession?.code}`]);
  }

  ngOnInit(): void {
    this.sessionSubscription = this.store
      .select((str) => str.sessionState)
      .subscribe((state) => {
        this.activeSession = state.activeSession;
      });
    this.playersSubscription = this.store
      .select((str) => str.playersState)
      .subscribe((val) => {
        this.players = val.players;
      });
  }
  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
  }
}
