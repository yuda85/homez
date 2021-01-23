import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StageType } from './models';
import { StageItemTodo } from './models/stage-item.interface';

@Injectable({
  providedIn: 'root',
})
export class StegesService {
  constructor() {}

  // public getStageItems(stageType: StageType): Observable<StageItemTodo> {}
}
