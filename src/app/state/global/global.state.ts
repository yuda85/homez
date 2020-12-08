import { State, StateContext, Action } from '@ngxs/store';
import { GlobalStateModel } from './global.model';

@State<GlobalStateModel>({
  name: 'global',
  defaults: {},
})
export class GlobalState {}
