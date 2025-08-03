import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  getCategoryByIncomeExpense,
} from '../controllers/category.controller';
const router = Router();

// category create router
router.post('/', createCategory);
//all  category get router
router.get('/', getAllCategory);
//single  category get router
router.get('/:id', getSingleCategory);
//single  category get router
router.get('/income-or-expense/:isIncome', getCategoryByIncomeExpense);
// category update router
router.patch('/:id', updateCategory);
// category delete router
router.delete('/:id', deleteCategory);

export default router;
