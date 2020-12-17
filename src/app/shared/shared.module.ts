import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './components/chart/pie-chart.component';
import { MaterialModule } from '../material/material.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [PieChartComponent, LineChartComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PieChartComponent, LineChartComponent],
})
export class SharedModule {}
