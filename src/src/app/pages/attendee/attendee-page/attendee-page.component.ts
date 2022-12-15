import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { IPlayerDto } from 'src/app/state/players/players-models';
import { sessionJoin } from 'src/app/state/session/session-actions';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-attendee-page',
  templateUrl: './attendee-page.component.html',
  styleUrls: ['./attendee-page.component.scss'],
})
export class AttendeePageComponent implements OnInit, OnDestroy {
  private sessionSubsciption?: Subscription;
  private playersSubscription?: Subscription;
  private userSubscription?: Subscription;

  private userId?: string;

  public players?: Array<IPlayerDto>;
  public isLoading: boolean = false;
  public playerId?: string;
  public player?: IPlayerDto;
  public activeSession?: ISessionDetailsDto;
  public showEmptyState: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  findPlayer() {
    if (this.userId && this.players) {
      this.player = this.players.find((p) => p.userId == this.userId);
      if (this.player) {
        this.playerId = this.player.id;
      }
    }
  }

  ngOnInit(): void {
    this.sessionSubsciption = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        this.activeSession = val.activeSession;
        this.showEmptyState = !val.isLoading && !val.activeSession;
      });
    this.playersSubscription = this.store
      .select((str) => str.playersState)
      .subscribe((val) => {
        this.isLoading = val.isLoading;
        this.players = val.players;
        this.findPlayer();
      });
    this.userSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        this.userId = val.userId;
        this.findPlayer();
      });
  }
  ngOnDestroy(): void {
    if (this.sessionSubsciption) {
      this.sessionSubsciption.unsubscribe();
    }
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
