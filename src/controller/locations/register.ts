import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Location } from '../../entity/location';
import { User } from '../../entity/user';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;    
    const { name } = req.body;

    const locationRepo = getRepository(Location);
    const userRepo = getRepository(User);

    try {
        const user = await userRepo.findOne(userId);

        if (!user) {
            const customError = new CustomError
                (404, 'General', `User with id: ${userId} not found.`, ['User not found.', 'Location cannot be registered.']);
            return next(customError);
        }

        const location = new Location();
        location.name = name;
        location.user = user;

        const newLocation = locationRepo.create(location);
        await locationRepo.save(newLocation);

        res.customSuccess(201, 'Location successfully created.');
    } catch (error) {
        console.log(`Error in LocationController - register\nCatch Error: ${error}\n`);

        const errorMessage = `Location: ${name} can't be created`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};