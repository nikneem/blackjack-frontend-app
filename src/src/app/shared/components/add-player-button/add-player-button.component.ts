import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../../dialogs/add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-add-player-button',
  templateUrl: './add-player-button.component.html',
  styleUrls: ['./add-player-button.component.scss'],
})
export class AddPlayerButtonComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  addPlayerDialog() {
    this.dialog.open(AddPlayerDialogComponent, {
      maxWidth: '540px',
      disableClose: true,
    });
  }

  ngOnInit(): void {}
}
