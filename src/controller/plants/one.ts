import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Plant } from '../../entity/plant';

export const one = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const plantRepo = getRepository(Plant);
    try {
        const plant = await plantRepo.findOne(id);

        // validations
        if (!plant) {
            const customError = new CustomError(404, 'General', `Plant with id: ${id} not found.`, ['Plant not found.']);
            return next(customError);
        }

        res.customSuccess(200, 'Plant found.', plant);
    } catch (error) {
        console.log(`Error in PlantController - one\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve plant with id:${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};