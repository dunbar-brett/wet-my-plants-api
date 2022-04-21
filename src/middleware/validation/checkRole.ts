import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../../utils/customError';
import { Role } from '../../entity/types';

export const checkRole = (roles: Role[]) => { // , isSelfAllowed = false
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id, role } = req.jwtPayload;
        //const { id: requestId } = req.params;

        // not sure if i need this
        // let errorSelfAllowed: string | null = null;
        // if (isSelfAllowed) {
        //     if (id === parseInt(requestId)) {
        //         return next();
        //     }
        //     errorSelfAllowed = 'Self allowed action.';
        // }

        const unauthErrorMessage = 'Unauthorized = Insufficeient user rights';
        if (roles.indexOf(role) === -1) {
            const errors = [
                unauthErrorMessage,
                `Current role: ${role}. Required role: ${roles.toString()}`
            ];

            const customError = new CustomError(401, 'Unauthorized', unauthErrorMessage, errors);
            return next(customError);
        }

        return next();
    };
};