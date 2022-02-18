import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Plant } from '../../entity/plant';
import { CustomError } from '../../utils/customError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const plantRepo = getRepository(Plant);

    try {
        const allPlants = await plantRepo.find();

        // TODO validations

        res.customSuccess(200, 'List of Plants.', allPlants);
    } catch (error) {
        console.log(`Error in PlantController - list\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve list of Plants`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};