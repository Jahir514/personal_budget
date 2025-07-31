import { Request, Response, NextFunction } from 'express';
import expenseService from '../services/expense.service';
//Expense  create controller
export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const expenseCreateRes = await expenseService.createExpense(data);
    res.status(200).json(expenseCreateRes);
  } catch (error) {
    next(error);
  }
};
//get all Expense  controller
export const getAllExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseGetRes = await expenseService.getAllExpense();
    res.status(200).json(expenseGetRes);
  } catch (error) {
    next(error);
  }
};
//get single Expense  controller
export const getSingleExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseId = req.params.id;
    const expenseGetRes = await expenseService.getSingleExpense(expenseId);
    res.status(200).json(expenseGetRes);
  } catch (error) {
    next(error);
  }
};
//Expense  update controller
export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseId = req.params.id;
    const data = req.body;
    const expenseUpdateRes = await expenseService.updateExpense(expenseId, data);
    res.status(200).json(expenseUpdateRes);
  } catch (error) {
    next(error);
  }
};
//Expense  delete controller
export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseId = req.params.id;
    const expenseDeleteRes = await expenseService.deleteExpense(expenseId);
    res.status(200).json(expenseDeleteRes);
  } catch (error) {
    next(error);
  }
};
