import { State } from '@ngxs/store/src/decorators/state';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {},
})
export class AuthState {}
