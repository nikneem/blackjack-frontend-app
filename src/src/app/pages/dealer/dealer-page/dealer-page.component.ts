import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-dealer-page',
  templateUrl: './dealer-page.component.html',
  styleUrls: ['./dealer-page.component.scss'],
})
export class DealerPageComponent implements OnInit, OnDestroy {
  private sessionSubscription?: Subscription;

  public activeSession?: ISessionDetailsDto;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.sessionSubscription = this.store
      .select((str) => str.sessionState)
      .subscribe((state) => {
        this.activeSession = state.activeSession;
      });
  }
  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
