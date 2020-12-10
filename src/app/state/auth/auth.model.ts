import { IUser } from '../../auth/models';

export interface AuthStateModel {
  user: IUser;
  isLoggedIn: boolean;
}
