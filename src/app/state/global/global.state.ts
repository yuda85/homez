import { State } from '@ngxs/store/src/decorators/state';
import { GlobalStateModel } from './global.model';

@State<GlobalStateModel>({
  name: 'global',
  defaults: {},
})
export class GlobalState {}
