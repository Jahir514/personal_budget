import { Router } from 'express';
import { createIncome, deleteIncome, getAllIncome, getSingleIncome, updateIncome } from '../controllers/income.controller';
const router = Router();

//Income  create router
router.post('/', createIncome);
//all Income  get router
router.get('/', getAllIncome);
//single Income  get router
router.get('/:id', getSingleIncome);
//Income  update router
router.patch('/:id', updateIncome);
//Income  delete router
router.delete('/:id', deleteIncome);

export default router;
