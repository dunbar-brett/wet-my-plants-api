import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { User } from '../../../entity/user';
import { CustomError } from '../../../utils/customError';
import { ErrorValidation } from '../../../utils/errorTypes';

export const validatorEdit = async (req: Request, res: Response, next:NextFunction) => {
    let { username, name } = req.body;
    const errorsValidation: ErrorValidation[] = [];
    const userRepository = getRepository(User);
  
    username = !username ? '' : username;
    name = !name ? '' : name;
  
    const user = await userRepository.findOne( username );
    if (user) {
      errorsValidation.push({ username: `Username '${username}' already exists` });
    }
  
    if (errorsValidation.length !== 0) {
      const customError = new CustomError(400, 'Validation', 'Edit user validation error', null, null, errorsValidation);
      return next(customError);
    }
    return next();
}