import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../entity/user';
import { CustomError } from '../../utils/customError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const userRepo = getRepository(User);

    try {
        const user = new User();
        user.name = name;
        user.password = password;
        user.hashPassword();
        user.email = email;

        const newUser = userRepo.create(user);
        await userRepo.save(newUser);
        
        res.customSuccess(201, 'User successfully created.');
    } catch (error) {
        console.log(`Error in UserController - list\nCatch Error: ${error}\n`);

        const errorMessage = `User '${email}' can't be created`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
}