import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Location } from '../../entity/location';

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { name } = req.body;

    const locationRepo = getRepository(Location);
    try {
        const location = await locationRepo.findOne(id);

        // validations
        if (!location) {
            const customError = new CustomError(404, 'General', `Location with id: ${id} not found.`, ['Location not found.']);
            return next(customError);
        }

        location.name = name;

        try {
            await locationRepo.save(location);
            res.customSuccess(204, 'Location successfully updated.');
        } catch (error) {
            console.log(`Error in Location controller - update during save\nError: ${error}`);

            const errorMessage = `Can't update location with id: ${id}.`;
            const customError = new CustomError(409, 'Raw', errorMessage, null, error);
            return next(customError);
        }
    } catch (error) {
        console.log(`Error in LocationController - update during find.\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve location with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};