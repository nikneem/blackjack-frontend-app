import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import {
  playerCreate,
  playerCreatedOk,
} from 'src/app/state/players/players-actions';
import { JoinTableDialogComponent } from '../join-table-dialog/join-table-dialog.component';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss'],
})
export class AddPlayerDialogComponent implements OnInit, OnDestroy {
  private userIdSubscription?: Subscription;
  private sessionIdSubscription?: Subscription;
  private playerSubscription?: Subscription;

  public playerNameForm: FormGroup;
  public isSending: boolean = false;
  public errorMessage?: string;

  constructor(
    public dialogRef: MatDialogRef<JoinTableDialogComponent>,
    private store: Store<IAppState>,
    private _actions$: Actions
  ) {
    this.playerNameForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      sessionId: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }

  addPlayer() {
    if (this.playerNameForm.valid && !this.playerNameForm.pristine) {
      const playerDto = this.playerNameForm.value;
      this.store.dispatch(playerCreate({ dto: playerDto }));
    }
  }

  ngOnInit(): void {
    this._actions$.pipe(ofType(playerCreatedOk)).subscribe((data: any) => {
      this.dialogRef.close();
    });

    this.userIdSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        if (val && val.userId) {
          this.playerNameForm.patchValue({ userId: val.userId });
        }
      });
    this.sessionIdSubscription = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        if (val && val.activeSession) {
          this.playerNameForm.patchValue({ sessionId: val.activeSession.id });
        }
      });
    this.playerSubscription = this.store
      .select((str) => str.playersState)
      .subscribe((val) => {
        this.isSending = val.isLoading;
      });
  }
  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.sessionIdSubscription) {
      this.sessionIdSubscription.unsubscribe();
    }
  }
}
