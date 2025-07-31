import { Document, ObjectId } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface IExpense extends Document {
  title: string;
  category: ObjectId;
  amount: number;
  createdAt?: Date;
  updateAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//Expense  create interface
export interface ICreateExpense {
  title: string;
  category: ObjectId;
  amount: number;
}
//Expense  update interface
export interface IUpdateExpense {
  title?: string;
  category?: ObjectId;
  amount?: number;
}
//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------
//Expense  create response interface
export interface ICreateExpenseResponse {
  success: boolean;
  message: string;
  expense: null | IExpense;
}
//Expense  get response interface
export interface IGetExpenseResponse {
  message: string;
  expense: null | IExpense | IExpense[];
}
//Expense  update response interface
export interface IUpdateExpenseResponse extends ICreateExpenseResponse {}
//Expense  delete response interface
export interface IDeleteExpenseResponse {
  success: boolean;
  message: string;
}
