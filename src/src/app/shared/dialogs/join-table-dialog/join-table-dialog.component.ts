import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import {
  sessionCreate,
  sessionCreatedOk,
  sessionJoin,
  sessionJoinedOk,
} from 'src/app/state/session/session-actions';
import {
  ISessionCreateDto,
  ISessionJoinDto,
} from 'src/app/state/session/session-models';
import { CreateTableDialogComponent } from '../create-table-dialog/create-table-dialog.component';

@Component({
  selector: 'app-join-table-dialog',
  templateUrl: './join-table-dialog.component.html',
  styleUrls: ['./join-table-dialog.component.scss'],
})
export class JoinTableDialogComponent implements OnInit, OnDestroy {
  private userIdSubscription?: Subscription;
  private sessionStateSubscription?: Subscription;

  public tableForm: FormGroup;
  public isSending: boolean = false;
  public errorMessage?: string;

  constructor(
    public dialogRef: MatDialogRef<JoinTableDialogComponent>,
    private store: Store<IAppState>,
    private _actions$: Actions
  ) {
    this.tableForm = new FormGroup({
      userId: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
      ]),
    });
  }

  joinExistingTable() {
    if (this.tableForm.valid && !this.tableForm.pristine) {
      const dto = this.tableForm.value as ISessionJoinDto;
      this.store.dispatch(sessionJoin({ dto: dto }));
    }
  }

  ngOnInit(): void {
    this._actions$.pipe(ofType(sessionJoinedOk)).subscribe((data: any) => {
      this.dialogRef.close();
    });
    this.userIdSubscription = this.store
      .select((str) => str.userState.userId)
      .subscribe((val) => {
        this.tableForm.patchValue({ userId: val });
      });
    this.sessionStateSubscription = this.store
      .select((str) => str.sessionState)
      .subscribe((val) => {
        this.isSending = val.isJoining;
        this.errorMessage = val.joinErrorMessage;
      });
  }
  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.sessionStateSubscription) {
      this.sessionStateSubscription.unsubscribe();
    }
  }
}
