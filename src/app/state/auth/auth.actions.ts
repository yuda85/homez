import { IUser } from '../../auth/models';

export class SetUser {
  static readonly type = '[Auth] Set User';
  constructor(public payload: IUser) {}
}
export class SetIsLoggedIn {
  static readonly type = '[Auth] Set Is Logged In';
  constructor(public payload: boolean) {}
}
