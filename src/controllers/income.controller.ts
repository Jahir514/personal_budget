import { Request, Response, NextFunction } from 'express';
import incomeService from '../services/income.service';
//Income  create controller
export const createIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const incomeCreateRes = await incomeService.createIncome(data);
    res.status(200).json(incomeCreateRes);
  } catch (error) {
    next(error);
  }
};
//get all Income  controller
export const getAllIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeGetRes = await incomeService.getAllIncome();
    res.status(200).json(incomeGetRes);
  } catch (error) {
    next(error);
  }
};
//get single Income  controller
export const getSingleIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeId = req.params.id;
    const incomeGetRes = await incomeService.getSingleIncome(incomeId);
    res.status(200).json(incomeGetRes);
  } catch (error) {
    next(error);
  }
};
//Income  update controller
export const updateIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeId = req.params.id;
    const data = req.body;
    const incomeUpdateRes = await incomeService.updateIncome(incomeId, data);
    res.status(200).json(incomeUpdateRes);
  } catch (error) {
    next(error);
  }
};
//Income  delete controller
export const deleteIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeId = req.params.id;
    const incomeDeleteRes = await incomeService.deleteIncome(incomeId);
    res.status(200).json(incomeDeleteRes);
  } catch (error) {
    next(error);
  }
};
