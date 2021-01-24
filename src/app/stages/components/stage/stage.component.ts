import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  IStage,
  StageItem,
  StageItemTodo,
} from '../../models/stage-item.interface';
import { StagesService } from '../../steges.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
})
export class StageComponent implements OnInit {
  @ViewChild('todoForm') todoForm: NgForm;
  @ViewChild('stageItemForm') stageItemForm: NgForm;

  @Input() currentStage: IStage;

  public exitingTodoError: boolean = false;
  public existingStageNameError: boolean = false;
  public isAddStageItemActive: boolean = false;

  constructor(private stageService: StagesService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public addTodo(itemIndex: number): void {
    this.currentStage.stageItems[itemIndex].isTodoFormActive = true;
  }

  public onSubmitTodoForm(stageItemIndx: number) {
    const newTodo: StageItemTodo = {
      title: this.todoForm.form.value.todoName,
      isCompleted: false,
    };

    let isTodoExist: boolean = false;
    this.currentStage.stageItems[stageItemIndx].todos.forEach((todo) => {
      if (todo.title === newTodo.title) {
        isTodoExist = true;
        this.exitingTodoError = true;
      } else {
        this.exitingTodoError = false;
      }
    });

    if (!isTodoExist) {
      this.currentStage.stageItems[stageItemIndx].todos.push(newTodo);
      this.calculateTodosProgress(stageItemIndx);
      this.stageService.updateStage(this.currentStage);
      this.todoForm.reset();
    }
  }

  public onSubmitStageItemForm() {
    const newStageItem: StageItem = {
      title: this.stageItemForm.form.value.name,
      description: this.stageItemForm.form.value.description,
      todos: [],
    };

    let existingStageName: boolean = false;
    this.currentStage.stageItems.forEach((stageItem) => {
      if (stageItem.title === newStageItem.title) {
        existingStageName = true;
        this.existingStageNameError = true;
      } else {
        this.existingStageNameError = false;
      }
    });
    if (!existingStageName) {
      this.currentStage.stageItems.push(newStageItem);
      this.stageItemForm.reset();
      this.isAddStageItemActive = false;
    }
  }

  public onClosePanel(stageItemIndex: number): void {
    this.currentStage.stageItems[stageItemIndex].isTodoFormActive = false;
  }

  public onOpenPanel(stageItemIndx: number): void {
    this.calculateTodosProgress(stageItemIndx);
    this.currentStage.stageItems.forEach((item) => {
      item.isTodoFormActive = false;
    });
  }

  public onAddStageItemClick(): void {
    this.isAddStageItemActive = true;
  }

  public calculateTodosProgress(stageItemIndx: number): void {
    const totalTodos = this.currentStage.stageItems[stageItemIndx].todos.length;

    const completedTodos = this.currentStage.stageItems[
      stageItemIndx
    ].todos.filter((todo) => !!todo.isCompleted).length;

    const precentage = (completedTodos / totalTodos) * 100;

    this.currentStage.stageItems[stageItemIndx].stageProgress = precentage;
  }

  public onTodoChange(stageItemIndx: number) {
    this.calculateTodosProgress(stageItemIndx);
  }
}
