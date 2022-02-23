import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../entity/user';
import { CustomError } from 'utils/customError';

export const update = async (req: Request, res: Response, next: NextFunction) => {
  return next();  
};