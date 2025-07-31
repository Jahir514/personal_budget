import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from '../controllers/category.controller';
const router = Router();

// category create router
router.post('/', createCategory);
//all  category get router
router.get('/', getAllCategory);
//single  category get router
router.get('/:id', getSingleCategory);
// category update router
router.patch('/:id', updateCategory);
// category delete router
router.delete('/:id', deleteCategory);

export default router;
