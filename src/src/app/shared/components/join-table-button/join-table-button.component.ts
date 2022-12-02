import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JoinTableDialogComponent } from '../../dialogs/join-table-dialog/join-table-dialog.component';

@Component({
  selector: 'app-join-table-button',
  templateUrl: './join-table-button.component.html',
  styleUrls: ['./join-table-button.component.scss'],
})
export class JoinTableButtonComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  joinTableDialog() {
    this.dialog.open(JoinTableDialogComponent, {
      maxWidth: '540px',
      disableClose: true,
    });
  }

  ngOnInit(): void {}
}
