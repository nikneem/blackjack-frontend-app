import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap, catchError, of } from 'rxjs';
import { ErrorsService } from 'src/app/services/errors.service';
import { SessionsService } from 'src/app/services/sessions.service';
import {
  sessionCreate,
  sessionCreatedOk,
  sessionCreateFailed,
  sessionJoin,
  sessionJoinedOk,
  sessionJoinFailed,
  sessionRetrieve,
  sessionRetrievedOK,
  sessionRetrieveFailed,
} from './session-actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private sessionsService: SessionsService,
    private errorService: ErrorsService,

    private router: Router
  ) {}

  sessionRetrieveEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionRetrieve),
      mergeMap((act) =>
        this.sessionsService.get(act.tableCodeOrId).pipe(
          map((dto) => {
            return sessionRetrievedOK({ dto: dto });
          }),
          catchError((err) => {
            return this.errorService.handleError(err).pipe(
              map((err) => {
                return sessionRetrieveFailed({ error: err });
              })
            );
          })
        )
      )
    )
  );

  sessionCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionCreate),
      mergeMap((act) =>
        this.sessionsService.create(act.dto).pipe(
          map((dto) => {
            return sessionCreatedOk({ dto: dto });
          }),
          tap((val) => {
            this.router.navigate([`/dealer/${val.dto.code}`]);
          }),
          catchError((err) => {
            return this.errorService.handleError(err).pipe(
              map((err) => {
                return sessionCreateFailed({ error: err });
              })
            );
          })
        )
      )
    )
  );

  sessionJoinEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionJoin),
      mergeMap((act) =>
        this.sessionsService.join(act.dto).pipe(
          map((dto) => {
            return sessionJoinedOk({ dto: dto });
          }),
          tap((val) => {
            this.router.navigate([`/attendee/${val.dto.code}`]);
          }),
          catchError((err) => {
            return this.errorService.handleError(err).pipe(
              map((err) => {
                return sessionJoinFailed({ error: err });
              })
            );
          })
        )
      )
    )
  );
}
