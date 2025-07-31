import {
  ICreateExpense,
  ICreateExpenseResponse,
  IDeleteExpenseResponse,
  IGetExpenseResponse,
  IExpense,
  IUpdateExpense,
  IUpdateExpenseResponse,
} from '../interfaces/expense.interface';
import Expense from '../model/expense.model';
import { AppError } from '../utils/AppError';

//Expense create service
const createExpense = async (data: ICreateExpense): Promise<ICreateExpenseResponse> => {
  const { title, category, amount } = data;
  if (!title || !category || !amount) throw new AppError('Please provide correct Expense information.', 400);

  //create ingridents instance
  const ExpenseInfo = {
    title,
    category,
    amount,
  };
  //save to database
  const expense = new Expense(ExpenseInfo);
  const savedExpense = await expense.save();
  //handle response
  if (savedExpense) {
    const ExpenseData = await Expense.findOne({ _id: savedExpense._id });
    return {
      success: true,
      message: 'Successfully create Expense',
      expense: ExpenseData,
    };
  } else {
    throw new AppError('Failed to create Expense', 400);
  }
};

//all Expense get service
const getAllExpense = async (): Promise<IGetExpenseResponse> => {
  const expense: IExpense[] = await Expense.find();
  if (expense.length == 0) {
    return {
      message: 'No Expense found.',
      expense,
    };
  } else {
    return {
      message: '',
      expense,
    };
  }
};
//single Expense get service
const getSingleExpense = async (expenseId: string): Promise<IGetExpenseResponse> => {
  const expense: IExpense | null = await Expense.findOne({ _id: expenseId });
  if (expense) {
    return {
      message: '',
      expense,
    };
  } else {
    throw new AppError('No Expense found.', 400);
  }
};

//Expense update service
const updateExpense = async (expenseId: string, data: IUpdateExpense): Promise<IUpdateExpenseResponse> => {
  // get Expense that need to update
  const expense: IExpense | null = await Expense.findOne({ _id: expenseId });
  //throw error if not exist
  if (!expense) {
    throw new AppError('No ingridents found', 400);
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedExpense: IExpense | null = await Expense.findByIdAndUpdate(expenseId, { $set: data }, option).select(
    'name serialNo supplier category stock costPrice salePrice unit'
  );
  if (updatedExpense) {
    return {
      success: true,
      message: 'Successfully update Expense ',
      expense: updatedExpense,
    };
  } else {
    return {
      success: false,
      message: 'Failed to update Expense ',
      expense: updatedExpense,
    };
  }
};
//Expense  delete service
const deleteExpense = async (expenseId: string): Promise<IDeleteExpenseResponse> => {
  // get Expense  that needs to delete
  const expense: IExpense | null = await Expense.findOne({ _id: expenseId });
  //throw error if not exist
  if (!expense) {
    throw new AppError('No Expense  found', 400);
  }
  //delete when it exist
  const deletedExpense: IExpense | null = await Expense.findByIdAndDelete(expenseId).select('name serialNo');
  //handle response
  if (deletedExpense) {
    return {
      success: true,
      message: 'Successfully delete Expense ',
    };
  } else {
    return {
      success: false,
      message: 'Failed to delete Expense ',
    };
  }
};

export default {
  createExpense,
  getAllExpense,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
