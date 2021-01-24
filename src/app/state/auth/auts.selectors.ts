import { Selector } from '@ngxs/store';
import { IUser } from '../../auth/models';
import { AuthStateModel } from './auth.model';
import { AuthState } from './auth.state';

export class AuthStateSelectors {
  @Selector([AuthState])
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector([AuthState])
  static user(state: AuthStateModel): IUser {
    return state.user;
  }
}
