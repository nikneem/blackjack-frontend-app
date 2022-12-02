import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerRoutingModule } from './dealer-routing.module';
import { DealerPageComponent } from './dealer-page/dealer-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DealerPageComponent],
  imports: [CommonModule, DealerRoutingModule, SharedModule],
})
export class DealerModule {}
