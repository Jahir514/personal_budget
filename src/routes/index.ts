import { Router } from 'express';
import expenseRoutes from './expense.routes';
import categoryRoutes from './category.routes';
import incomeRoutes from './income.routes';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
const router = Router();

//all features route
//auth routes
router.use('/auth', authRoutes);
//expense routes
router.use('/expense', expenseRoutes);
//category routes
router.use('/category', categoryRoutes);
//income routes
router.use('/income', incomeRoutes);
//dashboard routes
router.use('/dashboard', dashboardRoutes);

export default router;
