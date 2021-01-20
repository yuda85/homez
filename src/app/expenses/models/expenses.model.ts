import { Category } from './category.interface';

export interface Expense {
  id?: string;
  name: string;
  date: Date | string;
  category: Category;
  type: string;
  amount: number | string;
  comments?: string;
  file?: string;
  fileUrl?: string;
  fileId?: string;
}
