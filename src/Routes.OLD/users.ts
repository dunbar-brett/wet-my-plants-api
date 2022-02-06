import {body, param} from 'express-validator';
import { Users } from '../controller/users';

// TODO PUT (update) users -- see if that's needed?
// TODO this should all be admin actions
//      id. get one, get all, update, delete
export const users = [
    {
        method: "get",
        route: "/users",
        controller: Users,
        action: "all",
        middleware: [],
      }, 
      {
        method: "get",
        route: "/users/:id",
        controller: Users,
        action: "one",
        middleware: [
          param('id').isInt(),
        ],
      }, 
      {
        method: "post",
        route: "/users",
        controller: Users,
        action: "save",
        middleware: [
          body('name').isString(),
          body('email').isString(),
          body('email').isEmail(),
          body('password').isString(),
        ],
      }, 
      {
        method: "delete",
        route: "/users/:id",
        controller: Users,
        action: "remove",
        middleware: [
          param('id').isInt(),
        ],
      }, 
      // {
      //   method: "put",
      //   route: "/users/test",
      //   controller: Users,
      //   action: "save",
      //   middleware: [
      //     body('name').isString(),
      //     body('email').isString(),
      //     body('email').isEmail(),
      //     body('password').isString(), // TODO add validation for entire object
      //   ],
      // }, 
      {
        method: "post",
        route: "/users/test",
        controller: Users,
        action: "testAdd",
        middleware: []
      },
];