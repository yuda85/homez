import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { DatabaseService } from 'src/app/core/database.service';
import { StageType } from 'src/app/stages/models';
import { IStage } from 'src/app/stages/models/stage-item.interface';
import { BaseStages } from 'src/app/stages/stages.helper';
import { SetStages } from './stages.actions';
import { StagesStateModel } from './stages.model';
@Injectable({
  providedIn: 'root',
})
@State<StagesStateModel>({
  name: 'stages',
  defaults: {
    planning: {
      title: 'תכנון',
      stageItems: [],
      type: StageType.Planning,
    },
    building: {
      title: 'בניה',
      stageItems: [],
      type: StageType.Building,
    },
    finish: {
      title: 'פיניש',
      stageItems: [],
      type: StageType.Finish,
    },
  },
})
export class StagesState {
  constructor(private _db: DatabaseService) {}

  ngxsOnInit() {
    //if have stages set them in state
    //if not go to stages helper and update DB for user - and than update in state
    //
  }

  @Action(SetStages)
  setStages(ctx: StateContext<StagesStateModel>) {
    //check if user has stages
    this._db.getUserStages().subscribe((data) => {
      debugger;
      if (data.length) {
        data.forEach((stageItem) => {
          ctx.patchState({
            [stageItem.stage.type]: { ...stageItem.stage, id: stageItem.id },
          });
        });
      } else {
        BaseStages.forEach((stage: IStage) => {
          this._db.setStage(stage);
        });
      }
    });
  }
}
