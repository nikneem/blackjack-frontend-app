import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import {
  sessionCreate,
  sessionCreatedOk,
} from 'src/app/state/session/session-actions';
import { ISessionCreateDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-create-table-dialog',
  templateUrl: './create-table-dialog.component.html',
  styleUrls: ['./create-table-dialog.component.scss'],
})
export class CreateTableDialogComponent implements OnInit, OnDestroy {
  private userIdSubscription?: Subscription;
  private sessionStateSubscription?: Subscription;

  public tableForm: FormGroup;
  public isSending: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateTableDialogComponent>,
    private store: Store<IAppState>,
    private _actions$: Actions
  ) {
    this.tableForm = new FormGroup({
      userId: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  createNewTable() {
    if (this.tableForm.valid && !this.tableForm.pristine) {
      const dto = this.tableForm.value as ISessionCreateDto;
      this.store.dispatch(sessionCreate({ dto: dto }));
    }
  }

  ngOnInit(): void {
    this._actions$.pipe(ofType(sessionCreatedOk)).subscribe((data: any) => {
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
        this.isSending = val.isCreating;
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
