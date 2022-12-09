import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { playerRetrieve } from 'src/app/state/players/players-actions';
import { sessionRetrieve } from 'src/app/state/session/session-actions';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-session-details-template',
  templateUrl: './session-details-template.component.html',
  styleUrls: ['./session-details-template.component.scss'],
})
export class SessionDetailsTemplateComponent implements OnInit, OnDestroy {
  private sessionIdSubsciption?: Subscription;
  private sessionSubsciption?: Subscription;
  private userSubsciption?: Subscription;

  private tableCode?: string;

  public isLoading: boolean = true;
  public showEmptyState: boolean = false;
  public activeSession?: ISessionDetailsDto;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  private loadTableSession() {
    if (
      this.tableCode &&
      (!this.activeSession || this.activeSession.code !== this.tableCode)
    ) {
      this.store.dispatch(sessionRetrieve({ tableCodeOrId: this.tableCode }));
    }
  }

  ngOnInit(): void {
    this.sessionSubsciption = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        if (
          val.activeSession &&
          this.activeSession?.id !== val.activeSession?.id
        ) {
          this.store.dispatch(
            playerRetrieve({ sessionId: val.activeSession.id })
          );
        }
        this.activeSession = val.activeSession;
        this.isLoading = val.isLoading;
        this.showEmptyState =
          !val.isLoading &&
          !val.isJoining &&
          !val.isCreating &&
          this.activeSession === undefined;
      });

    let childRoute = this.route;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }

    this.sessionIdSubsciption = childRoute.params.subscribe((params) => {
      const tableCodeParam = params['id'];
      if (tableCodeParam) {
        this.tableCode = tableCodeParam;
        this.loadTableSession();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.sessionSubsciption) {
      this.sessionSubsciption.unsubscribe();
    }
    if (this.sessionIdSubsciption) {
      this.sessionIdSubsciption.unsubscribe();
    }
    if (this.userSubsciption) {
      this.userSubsciption.unsubscribe();
    }
  }
}
