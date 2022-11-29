import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap, catchError, of } from 'rxjs';
import { SessionsService } from 'src/app/services/sessions.service';
import {
  userIdentify,
  userIdentifySuccess,
  userIdentifyFailed,
} from '../user/user-actions';
import {
  sessionCreate,
  sessionCreatedOk,
  sessionCreateFailed,
} from './session-actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private sessionsService: SessionsService
  ) {}

  sessionCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionCreate),
      mergeMap((act) =>
        this.sessionsService.create(act.dto).pipe(
          map((dto) => {
            return sessionCreatedOk({ dto: dto });
          }),
          catchError(() => {
            return of(sessionCreateFailed({ errorMessage: 'error' }));
          })
        )
      )
    )
  );
}
