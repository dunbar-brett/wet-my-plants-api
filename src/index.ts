import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from './config';
import app from './app';
const port = config.port;
// import { ormConfig } from '../ormconfig';

createConnection().then(async connection => {
    app.listen(port, () => {
        return console.log(
            `Express is listening at http://localhost:${port}`
        );
    });
}).catch(error => console.log(error));

// TODO: Bring the above back in when Routes are created -- see if it works
// import 'reflect-metadata';
// import express from 'express';
// import {createConnection} from 'typeorm';
// import { port } from './config';

// createConnection().then(connection => {
//     const app = express();
//     app.use(express.json());

//     app.get('/', (req, res) => {
//         res.send('Hey buddy! Nodemon installed!!');
//     });
    
//     app.listen(port, () => {
//         return console.log(`Express is listening at http://localhost:${3000}`);
//     });
// }).catch(error => console.log(error));