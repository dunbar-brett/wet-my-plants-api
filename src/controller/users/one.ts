import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { User } from '../../entity/user';

export const one = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const userRepo = getRepository(User);
    try {
        const user = await userRepo.findOne(id);
        
        // Validations
        if (!user) {
            const customError = new CustomError(404, 'General', `User with id: ${id} not found.`, ['User not found.']);
            return next(customError);
        }

        res.customSuccess(200, 'User Found.', user);
    } catch (error) {
        console.log(`Error in UserController - one\nCatch Error: ${error}\n`);

        const errorMessage =  `Can't retrieve user with id:${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};