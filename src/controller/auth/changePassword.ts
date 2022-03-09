import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from '../../utils/customError';
import { User } from '../../entity/user';

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;
    // const { id, name } = req.jwtPayload;
    const id = null; // temp until i have jwt
    
    const userRepo = getRepository(User);
    try {

    } catch (error) {
        console.log(`Error in UserController - changePassword.\nError: ${error}\n`);

        const errorMessage = `Can't change password for user with id: ${id}`;
        const customError = new CustomError(400, 'Raw', errorMessage, null, error);
    }
}