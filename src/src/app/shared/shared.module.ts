import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { TranslateModule } from '@ngx-translate/core';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    DialogsModule,
    TranslateModule,
    TemplatesModule,
  ],
  exports: [
    MaterialModule,
    ComponentsModule,
    DialogsModule,
    TranslateModule,
    TemplatesModule,
  ],
})
export class SharedModule {}
