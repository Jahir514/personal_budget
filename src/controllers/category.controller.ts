import { Request, Response, NextFunction } from 'express';
import categoryService from '../services/category.service';
// category create controller
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const categoryCreateRes = await categoryService.createCategory(data);
    res.status(200).json(categoryCreateRes);
  } catch (error) {
    next(error);
  }
};
//get all  category controller
export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryGetRes = await categoryService.getAllCategory();
    res.status(200).json(categoryGetRes);
  } catch (error) {
    next(error);
  }
};
//get single  category controller
export const getSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const categoryGetRes = await categoryService.getSingleCategory(categoryId);
    res.status(200).json(categoryGetRes);
  } catch (error) {
    next(error);
  }
};
//get category by income or expense controller
export const getCategoryByIncomeExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isIncome = req.params.isIncome == 'true' ? true : false;
    const categoryGetRes = await categoryService.getCategoryByIncomeExpense(isIncome);
    res.status(200).json(categoryGetRes);
  } catch (error) {
    next(error);
  }
};
// category update controller
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    const categoryUpdateRes = await categoryService.updateCategory(categoryId, data);
    res.status(200).json(categoryUpdateRes);
  } catch (error) {
    next(error);
  }
};
// category delete controller
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const categoryDeleteRes = await categoryService.deleteCategory(categoryId);
    res.status(200).json(categoryDeleteRes);
  } catch (error) {
    next(error);
  }
};
