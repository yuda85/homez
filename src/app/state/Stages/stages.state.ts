import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { DatabaseService } from '../../core/database.service';
import { StageType } from '../../stages/models';
import { IStage } from '../../stages/models/stage-item.interface';
import { BaseStages } from '../../stages/stages.helper';
import { SetStages, UpdateStage } from './stages.actions';
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
            [stageItem.type]: { ...stageItem, id: stageItem.id },
          });
        });
      } else {
        BaseStages.forEach((stage: IStage) => {
          this._db.setStage(stage);
        });
      }
    });
  }

  @Action(UpdateStage)
  updateStage(ctx: StateContext<StagesStateModel>, payload: any) {
    ctx.patchState({
      [payload.type]: { ...payload },
    });
    this._db.updateStage(payload.payload);
  }
}
