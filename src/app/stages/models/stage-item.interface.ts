export interface StageItem {
  title: string;
  todos: Array<StageItemTodo>;
}

export interface StageItemTodo {
  title: string;
  isCompleted: boolean;
}

export interface IStage {
  title: string;
  stageItems: Array<StageItem>;
}
