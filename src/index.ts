import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from './config';
import app from './app';
const port = config.port;

createConnection().then(async connection => {
    console.log(`\nDatabase connected!`);
    console.log(`Name: ${connection.name}`);
    console.log(`Database: ${connection.options.database}`);

    app.listen(port, () => {
        return console.log(
            `\nExpress is listening at http://localhost:${port}\n`
        );
    });
}).catch(error => console.log(error));