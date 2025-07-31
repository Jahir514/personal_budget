export class AppError extends Error {
  statusCode: number
  isOperational: boolean
  constructor(message: string, statusCode: number, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    // Capturing stack trace for debugging
    Error.captureStackTrace(this, this.constructor)
  }
}
