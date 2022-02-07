import { getRepository, Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Plant } from '../entity/plant';

let plantRepo:Repository<Plant>;
// TODO extract these to their own files, wrap each in try/catch, and handle errors
// TODO add admin guard
export const list = async (req: Request, res: Response, next: NextFunction) => {
    plantRepo = getRepository(Plant);
    return plantRepo.find();
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    plantRepo = getRepository(Plant);
    const { name, locationId, user } = req.body;
    const plant = plantRepo.create({name, locationId, user})

    return plantRepo.save(plant);
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    plantRepo = getRepository(Plant);
    const { id } = req.body;
    const plant = await plantRepo.findOne(id);
    if (!plant) throw new Error('Plant not found.');

    const updatedPlant = req.body;
    return plantRepo.save(updatedPlant);
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    plantRepo = getRepository(Plant);
    const { id } = req.body;
    const plant = await plantRepo.findOne(id);
    if (!plant) throw new Error('Plant not found.');

    return plantRepo.delete(id);
}