import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../entity/user';
import { CustomError } from 'utils/customError';

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userRepo = getRepository(User);

    try {
        const userToRemove = await userRepo.findOne(id);

        // validations
        if (!userToRemove) {
            const customError = new CustomError(404, 'General', 'Not Found', [`User with id: ${id} doesn't exist.`]);
            next(customError);
        }

        userRepo.remove(userToRemove);

        res.customSuccess(200, 'User successfully deleted',
            { 
                id: userToRemove.id,
                name: userToRemove.name
            }
        );
    } catch (error) {
        console.log(`Error in UserController - list\nCatch Error: ${error}\n`);

        const errorMessage = `Can't remove User with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};