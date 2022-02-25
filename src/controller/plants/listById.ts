import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { User } from '../../entity/user';


export const listById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const userRepo = getRepository(User);

    try {
        const user = await userRepo.findOne({relations: ["plants"], where: {id: userId}});
        
        // validation
        if (!user) {
            const customError = new CustomError(404, 'General', `User with id: ${userId} not found.`, ['User not found.']);
            return next(customError);
        }

        res.customSuccess(200, 'List of User\'s Plants.', user.plants);
    } catch (error) {
        console.log(`Error in PlantController - listById\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve list of Plants`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};