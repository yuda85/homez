import { IStage } from 'src/app/stages/models/stage-item.interface';

export class SetStages {
  static readonly type = '[Stages] Set Stages';
  constructor() {}
}

export class UpdateStage {
  static readonly type = '[Stages] Update Stages';
  constructor(public payload: IStage) {}
}
