import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/customError';
import { ErrorValidation } from '../../../utils/errorTypes';

export const validatorChangePassword = (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    const errorsValidation: ErrorValidation[] = [];
  
    // set values to empty string if undefined
    email = !email ? '' : email;
    password = !password ? '' : password;
  
    // validate values using express validator library
    if (!validator.isEmail(email)) {
      errorsValidation.push({ email: 'Email is invalid' });
    }
  
    if (validator.isEmpty(email)) {
      errorsValidation.push({ email: 'Email field is required' });
    }
  
    if (validator.isEmpty(password)) {
      errorsValidation.push({ password: 'Password field is required' });
    }
  
    if (errorsValidation.length !== 0) {
      const customError = new CustomError(400, 'Validation', 'Login validation error', null, null, errorsValidation);
      return next(customError);
    }
    
    return next();
};