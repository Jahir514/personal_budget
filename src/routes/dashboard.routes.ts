import { Router } from 'express';
import { getIncomeSummary } from '../controllers/dashboard.controller';
const router = Router();

//all Income  get router
router.get('/summary', getIncomeSummary);

export default router;
