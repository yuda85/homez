export interface StageItem {
  title: string;
  todos: Array<StageItemTodo>;
}

export interface StageItemTodo {
  title: string;
  isCompleted: string;
}
