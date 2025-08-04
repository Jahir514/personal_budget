import { Document, ObjectId } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface IIncome extends Document {
  title: string;
  category: ObjectId;
  amount: number;
  date: Date;
  createdAt?: Date;
  updateAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//income  create interface
export interface ICreateIncome {
  title: string;
  category: ObjectId;
  amount: number;
  date: Date;
}
//income  update interface
export interface IUpdateIncome {
  title?: string;
  category?: ObjectId;
  amount?: number;
  date?: Date;
}
//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------
//income  create response interface
export interface ICreateIncomeResponse {
  success: boolean;
  message: string;
  income: null | IIncome;
}
//income  get response interface
export interface IGetIncomeResponse {
  message: string;
  income: null | IIncome | IIncome[];
}
//income summary get response interface
export interface IGetIncomeSummaryResponse {
  totalIncome: number;
  last7DaysChart: {
    date: Date;
    amount: number;
  }[];
  categoryWise: {
    category: String;
    amount: number;
  }[];
}
//income  update response interface
export interface IUpdateIncomeResponse extends ICreateIncomeResponse {}
//income  delete response interface
export interface IDeleteIncomeResponse {
  success: boolean;
  message: string;
}
