import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { GlobalStateModel } from './global.model';
@Injectable({
  providedIn: 'root',
})
@State<GlobalStateModel>({
  name: 'global',
  defaults: {},
})
export class GlobalState {}
