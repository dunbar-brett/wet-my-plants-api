import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../entity/user';
import { CustomError } from '../../utils/customError';

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const {
        name,
        email,
        role
    } = req.body;
    const userRepo = getRepository(User);

    try {
        const user = await userRepo.findOne(id);

        // Validations
        if (!user) {
            const customError = new CustomError
                (404, 'General', `User with id: ${id} not found.`, ['User not found.']);
            return next(customError);
        }

        user.name = name;
        user.email = email;
        user.role = role;

        try {
            await userRepo.save(user);
            res.customSuccess(204, 'User successfully updated.')
        } catch (error) {
            console.log(`Error in UserController - update during save\nError: ${error}`);

            const errorMessage = `Can't update user with id: ${id}.`;
            const customError = new CustomError(400, 'Raw', errorMessage, null, error);
            return next(customError);
        }
    } catch (error) {
        console.log(`Error in UserController - update during find.\nError: ${error}\n`);

        const errorMessage = `Can't update user with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};