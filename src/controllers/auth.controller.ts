import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';

//user register controller
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const userRegisterResponse = await authService.register(userData);
    res.status(200).json(userRegisterResponse);
  } catch (error) {
    next(error);
  }
};

//user login controller
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const userLoginResponse = await authService.login(data);
    res.status(200).json(userLoginResponse);
  } catch (error) {
    next(error);
  }
};

//send otp to phone controller
export const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.body;
    const otpSendResponse = await authService.sendPhoneOtp(phone);
    res.status(200).json(otpSendResponse);
  } catch (error) {
    next(error);
  }
};
//verfy otp register controller
export const verifyOtpRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, otp, password } = req.body;
    const result = await authService.completePhoneRegistration({ phone, otp, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
