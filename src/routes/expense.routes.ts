import { Router } from 'express';
import { createExpense, deleteExpense, getAllExpense, getSingleExpense, updateExpense } from '../controllers/expense.controller';
const router = Router();

//Expense  create router
router.post('/', createExpense);
//all Expense  get router
router.get('/', getAllExpense);
//single Expense  get router
router.get('/:id', getSingleExpense);
//Expense  update router
router.patch('/:id', updateExpense);
//Expense  delete router
router.delete('/:id', deleteExpense);

export default router;
