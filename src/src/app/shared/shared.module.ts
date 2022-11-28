import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';
import { DialogsModule } from './dialogs/dialogs.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, ComponentsModule, DialogsModule],
  exports: [MaterialModule, ComponentsModule, DialogsModule],
})
export class SharedModule {}
