import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs';
import { ErrorsService } from 'src/app/services/errors.service';
import { PlayersService } from 'src/app/services/players.service';
import {
  playerCreate,
  playerCreatedOk,
  playerCreateFailed,
  playerRetrieve,
  playerRetrievedOk,
  playerRetrieveFailed,
} from './players-actions';

@Injectable()
export class PlayersEffects {
  constructor(
    private actions$: Actions,
    private playersService: PlayersService,
    private errorService: ErrorsService
  ) {}

  playerRetrieveEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerRetrieve),
      mergeMap((act) =>
        this.playersService.get(act.sessionId).pipe(
          map((dto) => {
            return playerRetrievedOk({ dto: dto });
          }),
          catchError((err) => {
            return this.errorService.handleError(err).pipe(
              map((err) => {
                return playerRetrieveFailed({ error: err });
              })
            );
          })
        )
      )
    )
  );

  playerCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerCreate),
      mergeMap((act) =>
        this.playersService.post(act.dto).pipe(
          map((dto) => {
            return playerCreatedOk({ dto: dto });
          }),
          catchError((err) => {
            return this.errorService.handleError(err).pipe(
              map((err) => {
                return playerCreateFailed({ error: err });
              })
            );
          })
        )
      )
    )
  );
}
