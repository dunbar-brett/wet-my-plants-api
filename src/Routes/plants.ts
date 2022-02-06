import {body, param} from 'express-validator';
import { Plants } from '../controller/plants';

// Standard User level actions

export const plants = [
    {
        method: "get",
        route: "/plants",
        controller: Plants,
        action: "all", 
        middleware: [], // this needs admin
    }, 
    {
        method: "get",
        route: "/plants/:id",
        controller: Plants,
        action: "one",
        middleware: [
            param('id').isInt(),
        ],
    }, 
    {
        method: "get",
        route: "/plants/all/:id",
        controller: Plants,
        action: "allUserPlants",
        middleware: [
            body('id').isInt()
        ],
    }, 
    {
        method: "delete",
        route: "/plants/:id",
        controller: Plants,
        action: "remove",
        middleware: [
            param('id').isInt(),
        ],
    },
];