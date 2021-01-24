import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StageType } from '../models';
import { IStage } from '../models/stage-item.interface';
import { StagesService } from '../steges.service';

@Component({
  selector: 'app-stages-container',
  templateUrl: './stages-container.component.html',
  styleUrls: ['./stages-container.component.scss'],
})
export class StagesContainerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private stageService: StagesService
  ) {}

  public currentStage: IStage;

  ngOnInit(): void {
    this.setStage();
    this.stageService.setStages();
  }

  private setStage() {
    const activeStage = this.route.snapshot.routeConfig.path;

    this.stageService.getStage(activeStage as StageType).subscribe((data) => {
      console.log(data);
      this.currentStage = data;
    });
  }
}
