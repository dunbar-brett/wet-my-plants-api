import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Plant } from '../../entity/plant';

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const plantRepo = getRepository(Plant);

    try {
        const plantToRemove = await plantRepo.findOne(id);

        // validations
        if (!plantToRemove) {
            const customError = new CustomError(404, 'General', 'Not Found', [`Plant with id: ${id} doesn't exist.`]);
            return next(customError);
        }

        plantRepo.remove(plantToRemove);

        res.customSuccess(200, 'Plant successfully deleted',
            { 
                id: plantToRemove.id,
                name: plantToRemove.name
            }
        );
    } catch (error) {
        console.log(`Error in PlantController - remove\nCatch Error: ${error}\n`);

        const errorMessage = `Can't remove Plant with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};