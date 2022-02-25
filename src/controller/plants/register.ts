import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Plant } from '../../entity/plant';
import { User } from '../../entity/user';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    // this is wrong, i should be checking for user id and if user exists
    const userId = req.params.id;
    const { name, locationId } = req.body;

    const plantRepo = getRepository(Plant);
    const userRepo = getRepository(User);

    try {
        const user = await userRepo.findOne(userId);

        if (!user) {
            const customError = new CustomError
                (404, 'General', `User with id: ${userId} not found.`, ['User not found.', 'Plant cannot be registered.']);
            return next(customError);
        }

        // TODO need to verify the location Id with the user object here

        const plant = new Plant();
        plant.name = name;
        plant.locationId = locationId;
        plant.user = user;

        const newPlant = plantRepo.create(plant);
        await plantRepo.save(newPlant);

        res.customSuccess(201, 'Plant successfully created.');
    } catch (error) {
        console.log(`Error in PlantController - register\nCatch Error: ${error}\n`);

        const errorMessage = `Plant: ${name} can't be created`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};