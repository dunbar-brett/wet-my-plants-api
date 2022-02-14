import { getRepository, Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user';
import { CustomError } from '../utils/customError';

// TODO extract these to their own files, wrap each in try/catch, and handle errors
let userRepo:Repository<User>;
export const all = async (req: Request, res: Response, next: NextFunction) => {
    try {
        userRepo = getRepository(User);

        if (userRepo) console.log('user repo exists?')
        const users = await userRepo.find();
        res.customSuccess(200, 'List of users.', users);
    } catch (error) {
        console.log(`error: ${error}`);
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, error);
        return next(customError);
    }
};

export const one = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    userRepo = getRepository(User);
    try {
        const user = await userRepo.findOne(req.params.id);

        if (!user) {
            const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
            return next(customError);
        }

        res.customSuccess(200, 'User Found.', user);
    } catch (error) {
        console.log(`error: ${error}`);
        const customError = new CustomError(400, 'Raw', `Can't retrieve user with id:${id}.`, null, error);
        return next(customError);
    }
};

export const save = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    userRepo = getRepository(User);
    try {
        const newUser = new User();
        newUser.name = name;
        newUser.password = password;
        newUser.hashPassword();
        newUser.email = email;

        const user = userRepo.create(newUser);
        await userRepo.save(user);
        
        res.customSuccess(200, 'User successfully created.');
    } catch (error) {
        console.log(`error: ${error}`);
        const customError = new CustomError(400, 'Raw', `User '${email}' can't be created`, null, error);
        return next(customError);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    userRepo = getRepository(User);
    try {
        let userToRemove = await userRepo.findOne(id);

        if (!userToRemove) {
            const customError = new CustomError(404, 'General', 'Not Found', [`User with id:${id} doesn't exists.`]);
            next(customError);
        }
        userRepo.remove(userToRemove);

        res.customSuccess(200, 'User successfully deleted.',
            { id: userToRemove.id, name: userToRemove.name, email: userToRemove.email });
    } catch (error) {
        console.log(`error: ${error}`);
        const customError = new CustomError(400, 'Raw', `User with id:'${id}' can't be deleted`, null, error);
        return next(customError);
    }

};

// TODO: Add Guest endpoints -- not role guarded
