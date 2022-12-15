import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTableDialogComponent } from './create-table-dialog/create-table-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { JoinTableDialogComponent } from './join-table-dialog/join-table-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';

@NgModule({
  declarations: [
    CreateTableDialogComponent,
    JoinTableDialogComponent,
    AddPlayerDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
  ],
})
export class DialogsModule {}
