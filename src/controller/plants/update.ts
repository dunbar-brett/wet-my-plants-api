import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../utils/customError';
import { Plant } from '../../entity/plant';

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const {
        name,
        species,
        locationId,
        waterFreq,
        fertilizer,
        imageUrl,
        notes,
    } = req.body;
    const plantRepo = getRepository(Plant);

    try {
        const plant = await plantRepo.findOne(id);
        
        // validations
        if (!plant) {
            const customError = new CustomError
                (404, 'General', `Plant with id: ${id} not found.`, ['Plant not found.']);
            return next(customError);
        }

        plant.name = name;
        plant.species = species;
        plant.locationId = locationId;
        plant.waterFreq = waterFreq;
        plant.fertilizer = fertilizer;
        plant.imageUrl = imageUrl;
        plant.notes = notes;

        try {
            await plantRepo.save(plant);
            res.customSuccess(204, 'Plant successfully updated.');
        } catch (error) {
            console.log(`Error in Plant controller - update during save\nError: ${error}`);

            const errorMessage = `Can't update plant with id: ${id}.`;
            const customError = new CustomError(400, 'Raw', errorMessage, null, error);
            return next(customError);
        }
    } catch (error) {
        console.log(`Error in PlantController - update during find.\nError: ${error}\n`);

        const errorMessage = `Can't update plant with id: ${id}.`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
        return next(customError);
    }
};