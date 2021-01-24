import { Selector } from '@ngxs/store';
import { IStage } from 'src/app/stages/models/stage-item.interface';
import { StagesStateModel } from './stages.model';
import { StagesState } from './stages.state';

export class StagesStateSelectors {
  @Selector([StagesState])
  static planningStage(state: StagesStateModel): IStage {
    return state.planning;
  }
}
