import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { CreateTableButtonComponent } from './create-table-button/create-table-button.component';
import { MaterialModule } from '../material/material.module';
import { JoinTableButtonComponent } from './join-table-button/join-table-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableNotFoundComponent } from './table-not-found/table-not-found.component';
import { SessionDetailsHeaderComponent } from './session-details-header/session-details-header.component';
import { PlayerComponent } from './player/player.component';
import { DealerComponent } from './dealer/dealer.component';
import { AddPlayerButtonComponent } from './add-player-button/add-player-button.component';
import { AddPlayerPanelComponent } from './add-player-panel/add-player-panel.component';

@NgModule({
  declarations: [
    LoadingComponent,
    CreateTableButtonComponent,
    JoinTableButtonComponent,
    TableNotFoundComponent,
    SessionDetailsHeaderComponent,
    PlayerComponent,
    DealerComponent,
    AddPlayerButtonComponent,
    AddPlayerPanelComponent,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [
    LoadingComponent,
    CreateTableButtonComponent,
    JoinTableButtonComponent,
    TableNotFoundComponent,
    SessionDetailsHeaderComponent,
    PlayerComponent,
    DealerComponent,
    AddPlayerButtonComponent,
    AddPlayerPanelComponent,
  ],
})
export class ComponentsModule {}
