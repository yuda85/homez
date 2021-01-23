import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from '../core/database.service';
import { StageType } from './models';
import { IStage, StageItemTodo } from './models/stage-item.interface';
import { planningStage } from './stages.helper';

@Injectable({
  providedIn: 'root',
})
export class StagesService {
  constructor(private dataBaseService: DatabaseService) {}

  private planningSubject$: BehaviorSubject<IStage> = new BehaviorSubject(
    planningStage
  );

  public getStage(stageType: StageType): Observable<IStage> {
    return this.planningSubject$.asObservable();
  }
}
