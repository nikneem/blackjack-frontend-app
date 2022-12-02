import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-session-details-header',
  templateUrl: './session-details-header.component.html',
  styleUrls: ['./session-details-header.component.scss'],
})
export class SessionDetailsHeaderComponent implements OnInit, OnDestroy {
  private sessionSubscription?: Subscription;
  public activeSession?: ISessionDetailsDto;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.sessionSubscription = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        this.activeSession = val.activeSession;
      });
  }
  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
