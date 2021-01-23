import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { DatabaseService } from 'src/app/core/database.service';
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
    },
    building: {
      title: 'בניה',
      stageItems: [],
    },
    finish: {
      title: 'פיניש',
      stageItems: [],
    },
  },
})
export class StagesState {
  constructor(private _db: DatabaseService) {}

  ngxsOnInit() {
    //check if user has stages
    //if have stages set them in state
    //if not go to stages helper and update DB for user - and than update in state
    //
  }
}
