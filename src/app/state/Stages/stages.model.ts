import { IStage } from 'src/app/stages/models/stage-item.interface';

export class StagesStateModel {
  planning: IStage;
  building: IStage;
  finish: IStage;
}
