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
        const user = this.userRepo.create(req.body);
        return this.userRepo.save(user);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        let userToRemove = await this.userRepo.findOne(req.params.id);

        if (!userToRemove) throw new Error('User not found.');
        return this.userRepo.remove(userToRemove);
    }

    async testAdd(req: Request, res: Response, next: NextFunction) {
        const result = this.userRepo.save(this.userRepo.create({
            name: 'midna',
            email: 'dummy@gmail.com',
            password: 'password1234',
            locations: ['office'],
            role: 'user'
        }));

        if (!result) throw new Error('User not found.');

        return result;
    }
};

// TODO: Add Guest endpoints