import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Plant } from '../../entity/plant';
import { CustomError } from '../../utils/customError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, locationId, user } = req.body;

    const plantRepo = getRepository(Plant);

    try {
        const plant = new Plant();
        plant.name = name;
        plant.locationId = locationId;
        plant.user = user;
        console.log(`\n\nPlant: ${JSON.stringify(plant)}\n\n`);

        const newPlant = plantRepo.create(plant);
        console.log(`\n\nNew Plant: ${JSON.stringify(newPlant)}\n\n`);
        await plantRepo.save(newPlant);

        res.customSuccess(200, 'Plant successfully created.');
    } catch (error) {
        console.log(`Error in PlantController - list\nCatch Error: ${error}\n`);

        const errorMessage = `Plant: ${name} can't be created`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};