import { State, StateContext, Action } from '@ngxs/store';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {},
})
export class AuthState {}
