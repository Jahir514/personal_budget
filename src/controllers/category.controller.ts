import { Request, Response, NextFunction } from 'express';
import categoryService from '../services/category.service';
// category create controller
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const ingridentsCategoryCreateRes = await categoryService.createCategory(data);
    res.status(200).json(ingridentsCategoryCreateRes);
  } catch (error) {
    next(error);
  }
};
//get all  category controller
export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingridentsCategoryGetRes = await categoryService.getAllCategory();
    res.status(200).json(ingridentsCategoryGetRes);
  } catch (error) {
    next(error);
  }
};
//get single  category controller
export const getSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsCategoryId = req.params.id;
    const ingridentsCategoryGetRes = await categoryService.getSingleCategory(ingredientsCategoryId);
    res.status(200).json(ingridentsCategoryGetRes);
  } catch (error) {
    next(error);
  }
};
// category update controller
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsCategoryId = req.params.id;
    const data = req.body;
    const ingridentsCategoryUpdateRes = await categoryService.updateCategory(ingredientsCategoryId, data);
    res.status(200).json(ingridentsCategoryUpdateRes);
  } catch (error) {
    next(error);
  }
};
// category delete controller
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsCategoryId = req.params.id;
    const ingridentsCategoryDeleteRes = await categoryService.deleteCategory(ingredientsCategoryId);
    res.status(200).json(ingridentsCategoryDeleteRes);
  } catch (error) {
    next(error);
  }
};
