import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesContainerComponent } from './stages-container/stages-container.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StagesContainerComponent],
  imports: [CommonModule, SharedModule],
  exports: [StagesContainerComponent],
})
export class StagesModule {}
