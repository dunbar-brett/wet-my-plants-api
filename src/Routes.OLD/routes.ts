import { users } from './users';
import { plants } from './plants';
import { auth } from './auth';

export const Routes = [
    ...users,
    ...plants,
    ...auth
];