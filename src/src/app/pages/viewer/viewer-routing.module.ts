import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerPageComponent } from './viewer-page/viewer-page.component';

const routes: Routes = [
  {
    path: 'viewer',
    pathMatch: 'full',
    children: [{ path: '', component: ViewerPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewerRoutingModule {}
