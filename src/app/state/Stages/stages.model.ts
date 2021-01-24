import { IStage } from 'src/app/stages/models/stage-item.interface';

export interface StagesStateModel {
  planning: IStage;
  building: IStage;
  finish: IStage;
}
