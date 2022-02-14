import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Plant } from '../../entity/plant';
import { CustomError } from '../../utils/customError';

export const listById = async (req: Request, res: Response, next: NextFunction) => {
    // get params from req.body
    const plantRepo = getRepository(Plant);

    try {
        // db action
        const allPlants = await plantRepo.find();

        // validations

        // return success with object if needed
        res.customSuccess(200, 'List of Plants.', allPlants);
    } catch (error) {
        // debug error
        console.log(`Error in PlantController - list\nCatch Error: ${error}\n`);

        // set up custom error
        const errorMessage = `Can't retrieve list of Plants`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};