import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTableDialogComponent } from './create-table-dialog/create-table-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [CreateTableDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class DialogsModule {}
