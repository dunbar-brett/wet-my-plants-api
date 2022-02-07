import { Connection, createConnection } from "typeorm";

export const dbConnection = async () => {
    try {
        const connection: Connection = await createConnection();
        console.log(`\nDatabase connected!`);
        console.log(`Name: ${connection.name}`);
        console.log(`Database: ${connection.options.database}`);
    } catch (err) {
        console.log(err);
    }
    return null; // is this necessary?
}