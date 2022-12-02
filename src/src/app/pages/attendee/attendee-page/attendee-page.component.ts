import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { sessionJoin } from 'src/app/state/session/session-actions';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-attendee-page',
  templateUrl: './attendee-page.component.html',
  styleUrls: ['./attendee-page.component.scss'],
})
export class AttendeePageComponent implements OnInit, OnDestroy {
  private sessionIdSubsciption?: Subscription;
  private sessionSubsciption?: Subscription;
  private userSubsciption?: Subscription;

  private userId?: string;
  private tableCode?: string;

  public isLoading: boolean = true;
  public showEmptyState: boolean = false;
  public activeSession?: ISessionDetailsDto;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  private loadTableSession() {
    if (
      this.userId &&
      this.tableCode &&
      (!this.activeSession || this.activeSession.code !== this.tableCode)
    ) {
      const dto = {
        userId: this.userId,
        code: this.tableCode,
      };
      this.store.dispatch(sessionJoin({ dto: dto }));
    }
  }

  ngOnInit(): void {
    this.userSubsciption = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        this.userId = val.userId;
        this.loadTableSession();
      });
    this.sessionSubsciption = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        this.activeSession = val.activeSession;
        this.isLoading = val.isJoining;
        this.showEmptyState =
          !val.isJoining && this.activeSession === undefined;
      });
    this.sessionIdSubsciption = this.route.params.subscribe((params) => {
      this.tableCode = params['id'];
      this.loadTableSession();
    });
  }
  ngOnDestroy(): void {
    if (this.sessionSubsciption) {
      this.sessionSubsciption.unsubscribe();
    }
    if (this.sessionIdSubsciption) {
      this.sessionIdSubsciption.unsubscribe();
    }
  }
}
