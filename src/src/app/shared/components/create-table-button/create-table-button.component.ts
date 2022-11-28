import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTableDialogComponent } from '../../dialogs/create-table-dialog/create-table-dialog.component';

@Component({
  selector: 'app-create-table-button',
  templateUrl: './create-table-button.component.html',
  styleUrls: ['./create-table-button.component.scss'],
})
export class CreateTableButtonComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  createTableDialog() {
    this.dialog.open(CreateTableDialogComponent, {
      maxWidth: '540px',
      disableClose: true,
    });
  }

  ngOnInit(): void {}
}
