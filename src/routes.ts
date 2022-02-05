import {body, param} from 'express-validator';
import { Users } from './controller/users';
import { Plants } from './controller/plants';

export const Routes = [
  // USERS
  {
    method: "get",
    route: "/users",
    controller: Users,
    action: "all",
    validation: [],
  }, 
  {
    method: "get",
    route: "/users/:id",
    controller: Users,
    action: "one",
    validation: [
      param('id').isInt(),
    ],
  }, 
  {
    method: "post",
    route: "/users",
    controller: Users,
    action: "save",
    validation: [
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
    validation: [
      param('id').isInt(),
    ],
  }, 
  // {
  //   method: "put",
  //   route: "/users/test",
  //   controller: Users,
  //   action: "save",
  //   validation: [
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
    validation: []
  },

  // Plants
  {
    method: "get", // remove this route later
    route: "/plants",
    controller: Plants,
    action: "all", 
    validation: [],
  }, 
  {
    method: "get",
    route: "/plants/:id",
    controller: Plants,
    action: "one",
    validation: [
      param('id').isInt(),
    ],
  }, 
  {
    method: "get",
    route: "/plants/all/:id",
    controller: Plants,
    action: "allUserPlants",
    validation: [
      body('id').isInt()
    ],
  }, 
  {
    method: "delete",
    route: "/plants/:id",
    controller: Plants,
    action: "remove",
    validation: [
      param('id').isInt(),
    ],
  }, 
];
// TODO PUT users -- see if that's needed?
// TODO set up post routes for Plants

// save for reference
// body('age').isInt({ min: 0 }).withMessage('age must be a positive integer'),