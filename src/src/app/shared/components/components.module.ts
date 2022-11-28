import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { CreateTableButtonComponent } from './create-table-button/create-table-button.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoadingComponent, CreateTableButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LoadingComponent, CreateTableButtonComponent],
})
export class ComponentsModule {}
