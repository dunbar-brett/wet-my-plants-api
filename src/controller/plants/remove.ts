import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Plant } from '../../entity/plant';
import { CustomError } from '../../utils/customError';

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    // get params from req.body
    const id = req.params.id;
    const plantRepo = getRepository(Plant);

    try {
        const plantToRemove = await plantRepo.findOne(id);

        // validations
        if (!plantToRemove) {
            const customError = new CustomError(404, 'General', 'Not Found', [`Plant wiht id:${id} doesn't exist.`]);
            next(customError);
        }

        plantRepo.remove(plantToRemove);

        res.customSuccess(200, 'Plant successfully deleted',
            { 
                id: plantToRemove.id,
                name: plantToRemove.name
            }
        );
    } catch (error) {
        // debug error
        console.log(`Error in PlantController - list\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve list of Plants`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};