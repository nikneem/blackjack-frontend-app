import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-table-dialog',
  templateUrl: './create-table-dialog.component.html',
  styleUrls: ['./create-table-dialog.component.scss'],
})
export class CreateTableDialogComponent implements OnInit {
  public tableForm: FormGroup;
  public isSending: boolean = false;
  constructor() {
    this.tableForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  createNewTable() {
    this.isSending = true;
  }

  ngOnInit(): void {}
}
