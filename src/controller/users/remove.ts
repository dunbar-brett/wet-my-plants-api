import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../entity/user';
import { CustomError } from '../../utils/customError';

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    console.log(`\n\n\nid: ${id}\n\n\n`);
    const userRepo = getRepository(User);
    

    try {
        const userToRemove = await userRepo.findOne(id);

        console.log(`\n\n\nuserToRemove: ${userToRemove}\n\n\n`);
        console.log(`\n\n\n!userToRemove: ${!userToRemove}\n\n\n`);

        // validations
        if (!userToRemove) {
            
            console.log(`\n\n\nDID I MAKE IT HERE?\n\n\n`); 
            const customError = new CustomError(404, 'General', 'Not Found', [`User with id: ${id} doesn't exist.`]);
            return next(customError);
        }

        userRepo.remove(userToRemove);

        res.customSuccess(200, 'User successfully deleted',
            { 
                id: userToRemove.id,
                name: userToRemove.name
            }
        );
    } catch (error) {
        console.log(`Error in UserController - remove\nCatch Error: ${error}\n`);

        const errorMessage = `Can't remove User with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};