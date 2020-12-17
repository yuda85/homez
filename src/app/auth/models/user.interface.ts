export interface IUser {
  displayName: string;
  creationDate: string | Date;
  expensesEntered: number;
  lastLogin: string | Date;
  id: string;
  photoURL: string;
}
