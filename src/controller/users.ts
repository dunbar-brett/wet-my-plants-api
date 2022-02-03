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
        // const user2 = new User {
        //     name: 'midna',
        //     email: 'midna@gmail.com',
        //     password: 'password1234',
        //     locations: ['dark realm'],
        //     role: 'user'
        // };

        const res1 = this.userRepo.save(this.userRepo.create({
            name: 'midna',
            email: 'dummy@gmail.com',
            password: 'password1234',
            locations: ['office'],
            role: 'admin'
        }));
        if (!res1) throw new Error('User not found.');

        return res1;
    }
};