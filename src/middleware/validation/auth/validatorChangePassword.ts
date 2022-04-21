import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/customError';
import { ErrorValidation } from '../../../utils/errorTypes';

export const validatorLogin = (req: Request, res: Response, next: NextFunction) => {
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
        /*
            422 (Unprocessable Entity) response status code indicates that the server 
            understands the content type of the request entity, and the syntax of the 
            request entity is correct, but it was unable to process the contained instructions.
        */
      const customError = new CustomError(422, 'Validation', 'Login validation error', null, null, errorsValidation);
      return next(customError);
    }
    
    return next();
};