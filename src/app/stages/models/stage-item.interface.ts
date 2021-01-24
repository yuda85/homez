import { StageType } from './stages.enum';

export interface StageItem {
  title: string;
  description: string;
  todos: Array<StageItemTodo>;
  isTodoFormActive?: boolean;
  stageProgress?: number;
}

export interface StageItemTodo {
  title: string;

  isCompleted: boolean;
}

export interface IStage {
  title: string;
  type: StageType;
  stageItems: Array<StageItem>;
  id?: string;
}
