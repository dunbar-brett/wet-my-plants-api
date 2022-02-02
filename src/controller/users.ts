import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user';

export class Users {
    private userRepo = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.userRepo.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.userRepo.findOne(req.params.id);
    }

    async save(req: Request, res: Response, next: NextFunction) {
        return this.userRepo.save(req.body);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        let userToRemove = await this.userRepo.findOne(req.params.id);
        if (!userToRemove) throw new Error('User not found.');
        return this.userRepo.remove(userToRemove);
    }
};