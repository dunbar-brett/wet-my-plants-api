import {body, param} from 'express-validator';
import { Users } from './controller/users';

export const Routes = [{
    method: "get",
    route: "/users",
    controller: Users,
    action: "all",
    validation: [],
  }, {
    method: "get",
    route: "/users/:id",
    controller: Users,
    action: "one",
    validation: [
      param('id').isInt(),
    ],
  }, {
    method: "post",
    route: "/users",
    controller: Users,
    action: "save",
    validation: [
      body('name').isString(),
      body('email').isString(),
      body('password').isString()
      //body('age').isInt({ min: 0 }).withMessage('age must be a positive integer'),
    ],
  }, {
    method: "delete",
    route: "/users/:id",
    controller: Users,
    action: "remove",
    validation: [
      param('id').isInt(),
    ],
  }, {
    method: "post",
    route: "/users/test",
    controller: Users,
    action: "testAdd",
    validation: []
  }
];
// TODO PUT users
// TODO set up routes for Plants