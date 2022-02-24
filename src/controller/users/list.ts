import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { User } from '../../entity/user';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = getRepository(User);

    try {
        const users = await userRepo.find();

        res.customSuccess(200, 'List of users.', users);
    } catch (error) {
        console.log(`Error in UserController - list\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve list of Users.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};