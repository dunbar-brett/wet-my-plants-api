import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Location } from '../../entity/location';

export const one = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const locationRepo = getRepository(Location);
    try {
        const location = await locationRepo.findOne(id);

        // validations
        if (!location) {
            const customError = new CustomError(404, 'General', `Location with id: ${id} not found.`, ['Location not found.']);
            return next(customError);
        }

        res.customSuccess(200, 'Location found.', location);
    } catch (error) {
        console.log(`Error in LocationController - one\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve location with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};