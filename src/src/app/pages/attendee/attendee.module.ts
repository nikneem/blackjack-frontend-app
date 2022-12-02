import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendeeRoutingModule } from './attendee-routing.module';
import { AttendeePageComponent } from './attendee-page/attendee-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AttendeePageComponent],
  imports: [CommonModule, AttendeeRoutingModule, SharedModule],
})
export class AttendeeModule {}
