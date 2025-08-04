import { Request, Response, NextFunction } from 'express';
import incomeService from '../services/dashboard.service';

//get all Income summary controller
export const getIncomeSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeGetRes = await incomeService.getIncomeSummary();
    res.status(200).json(incomeGetRes);
  } catch (error) {
    next(error);
  }
};
