import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionDetailsTemplateComponent } from 'src/app/shared/templates/session-details-template/session-details-template.component';
import { AttendeePageComponent } from './attendee-page/attendee-page.component';

const routes: Routes = [
  {
    path: 'attendee',
    component: SessionDetailsTemplateComponent,
    children: [{ path: ':id', component: AttendeePageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendeeRoutingModule {}
