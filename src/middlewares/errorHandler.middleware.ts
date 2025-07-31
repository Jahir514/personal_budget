import { Request, Response, NextFunction } from 'express'

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  } else {
    // If the error is programming or unknown (e.g., MongoDB connection issues)
    console.error('ERROR 💥:', error)
    // Respond with a generic message, for security reasons
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    })
  }
}
