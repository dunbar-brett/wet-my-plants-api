import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/customError';
import { ErrorValidation } from '../../../utils/errorTypes';

export const validatorLogin = (req: Request, res: Response, next: NextFunction) => {};