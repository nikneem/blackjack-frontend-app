import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionDetailsTemplateComponent } from './session-details-template/session-details-template.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SessionDetailsTemplateComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
})
export class TemplatesModule {}
