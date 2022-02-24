import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Location } from '../../entity/location';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const locationRepo = getRepository(Location);

    try {
        const allLocations = await locationRepo.find();

        res.customSuccess(200, 'List of Locations.', allLocations);
    } catch (error) {
        console.log(`Error in LocationController - list\nCatch Error: ${error}\n`);

        const errorMessage = `Can't retrieve list of Locations`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};