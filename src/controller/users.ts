import { getRepository, Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user';

// TODO extract these to their own files, wrap each in try/catch, and handle errors
let userRepo:Repository<User>;
export const all = async (req: Request, res: Response, next: NextFunction) => {
    userRepo = getRepository(User);
    return userRepo.find();
};

export const one = async (req: Request, res: Response, next: NextFunction) => {
    userRepo = getRepository(User);
    return userRepo.findOne(req.params.id);
};

export const save = async (req: Request, res: Response, next: NextFunction) => {
    userRepo = getRepository(User);
    const user = userRepo.create(req.body);
    return userRepo.save(user);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    userRepo = getRepository(User);
    let userToRemove = await userRepo.findOne(req.params.id);

    if (!userToRemove) throw new Error('User not found.');
    return userRepo.remove(userToRemove);
};

// TODO: Add Guest endpoints -- not role guarded