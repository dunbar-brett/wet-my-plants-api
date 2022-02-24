import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Plant } from '../../entity/plant';

// TODO this still needs to be done.

export const listById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const plantRepo = getRepository(Plant);

    try {
        // db action
        const allPlants = await plantRepo.findOne();// by user id

        // validations

        // return success with object if needed
        res.customSuccess(200, 'List of Plants.', allPlants);
    } catch (error) {
        // debug error
        console.log(`Error in PlantController - listById\nCatch Error: ${error}\n`);

        // set up custom error
        const errorMessage = `Can't retrieve list of Plants`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};