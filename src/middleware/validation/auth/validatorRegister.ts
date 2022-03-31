import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/customError';
import { ErrorValidation } from '../../../utils/errorTypes';

const PASSWORD_MIN_CHAR = 8;

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
    let { email, password, passwordConfirm } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    // set values to empty string if undefined
    email = !email ? '' : email;
    password = !password ? '' : password;
    passwordConfirm = !passwordConfirm ? '' : passwordConfirm;

    // validate values using express validator library
    if (!validator.isEmail(email)) {
        errorsValidation.push({ email: 'Email is invalid' });
    }

    if (validator.isEmpty(email)) {
        errorsValidation.push({ email: 'Email is required' });
    }

    if (validator.isEmpty(password)) {
        errorsValidation.push({ password: 'Password is required' });
    }
    
    // TODO add validator for at least 1 special char, likely need regex
    if (!validator.isLength(password, { min: PASSWORD_MIN_CHAR })) {
        errorsValidation.push({
            password: `Password must be at least ${PASSWORD_MIN_CHAR} characters`,
        });
    }
    
    if (validator.isEmpty(passwordConfirm)) {
        errorsValidation.push({ passwordConfirm: 'Confirm password is required' });
    }
    
    if (!validator.equals(password, passwordConfirm)) {
        errorsValidation.push({ passwordConfirm: 'Passwords must match' });
    }

    if (errorsValidation.length !== 0) {
        /*
            422 (Unprocessable Entity) status code means the server understands the content type of the request entity status code is
            inappropriate, and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) 
            but was unable to process the contained instructions. 
        */
        const customError = new CustomError(422, 'Validation', 'Register validation error', null, null, errorsValidation);
        return next(customError);
    }

    return next();
};