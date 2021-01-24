import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from '../core/database.service';
import { SetStages } from '../state/Stages/stages.actions';
import { StagesStateSelectors } from '../state/Stages/stages.selectors';
import { StageType } from './models';
import { IStage, StageItemTodo } from './models/stage-item.interface';

@Injectable({
  providedIn: 'root',
})
export class StagesService {
  constructor(private dataBaseService: DatabaseService, private store: Store) {}

  public getStage(stageType: StageType): Observable<IStage> {
    return this.store.select(StagesStateSelectors.planningStage);
  }

  public setStages(): void {
    this.store.dispatch(new SetStages());
  }
}
