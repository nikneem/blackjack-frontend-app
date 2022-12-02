import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionDetailsTemplateComponent } from 'src/app/shared/templates/session-details-template/session-details-template.component';
import { DealerPageComponent } from './dealer-page/dealer-page.component';

const routes: Routes = [
  {
    path: 'dealer',
    component: SessionDetailsTemplateComponent,
    children: [{ path: ':id', component: DealerPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerRoutingModule {}
