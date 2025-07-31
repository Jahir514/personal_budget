import { Router } from 'express';
import { login, register, sendOTP, verifyOtpRegister } from '../controllers/auth.controller';
const router = Router();

//user register route
router.post('/register', register);
//user login route
router.post('/login', login);
//user send otp route
router.post('/send-otp', sendOTP);
//verify otp route
router.post('/verify-otp-register', verifyOtpRegister);

export default router;
