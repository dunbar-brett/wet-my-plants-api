import 'reflect-metadata';
import express, { application } from 'express';
import {createConnection} from "typeorm";

createConnection().then(connection => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hey buddy! Nodemon installed!!');
    });
    
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${3000}`);
    });
}).catch(error => console.log(error));
