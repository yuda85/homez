import { State, StateContext, Action } from '@ngxs/store';
import { SetIsLoggedIn, SetUser } from './auth.actions';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoggedIn: false,
    user: null as any,
  },
})
export class AuthState {
  ngxsOnInit(ctx: StateContext<AuthStateModel>) {}

  @Action(SetUser)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUser) {
    ctx.patchState({ user: action.payload });
  }

  @Action(SetIsLoggedIn)
  setIsLoggedIn(ctx: StateContext<AuthStateModel>, payload: any) {
    ctx.patchState({ isLoggedIn: payload.isLoggedIn });
  }
}
