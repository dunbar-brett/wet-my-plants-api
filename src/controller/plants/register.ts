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