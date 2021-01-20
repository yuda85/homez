import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './components/chart/pie-chart.component';
import { MaterialModule } from '../material/material.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PieChartComponent, LineChartComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [PieChartComponent, LineChartComponent, FormsModule],
})
export class SharedModule {}
