 
export class AppError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = false;
      this.error = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }