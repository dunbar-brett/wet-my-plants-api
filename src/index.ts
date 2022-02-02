import "reflect-metadata";
import { createConnection } from 'typeorm';
import { port } from './config';
import app from './app';

createConnection().then(connection => {
    app.listen(port, () => {
        return console.log(
            `Express is listening at http://localhost:${3000}`
        );
    });
}).catch(error => console.log(error));