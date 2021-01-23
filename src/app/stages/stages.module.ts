import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesContainerComponent } from './stages-container/stages-container.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { StageComponent } from './components/stage/stage.component';

@NgModule({
  declarations: [StagesContainerComponent, StageComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [StagesContainerComponent],
})
export class StagesModule {}
