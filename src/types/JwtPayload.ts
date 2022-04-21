import { Role } from '../entity/types';

export type JwtPayload = {
    id: number;
    name: string;
    email: string;
    role: Role;
    created_at: Date;
};