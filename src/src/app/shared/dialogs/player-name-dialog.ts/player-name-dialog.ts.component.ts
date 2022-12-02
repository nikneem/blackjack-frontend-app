import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { JoinTableDialogComponent } from '../join-table-dialog/join-table-dialog.component';

@Component({
  selector: 'app-player-name-dialog.ts',
  templateUrl: './player-name-dialog.ts.component.html',
  styleUrls: ['./player-name-dialog.ts.component.scss'],
})
export class PlayerNameDialogTsComponent implements OnInit, OnDestroy {
  private userIdSubscription?: Subscription;

  public playerNameForm: FormGroup;
  public isSending: boolean = false;
  public errorMessage?: string;

  constructor(
    public dialogRef: MatDialogRef<JoinTableDialogComponent>,
    private store: Store<IAppState>,
    private _actions$: Actions
  ) {
    this.playerNameForm = new FormGroup({
      userId: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }

  private refreshUsernameFromServer(userId: string) {}

  changePlayerName() {}

  ngOnInit(): void {
    this.userIdSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        if (val.userId) {
          this.refreshUsernameFromServer(val.userId);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
