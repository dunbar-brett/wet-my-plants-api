
export default module = {
    "type": process.env.TYPEORM_CONNECTION,
    "host": process.env.TYPEORM_HOST,
    "port": process.env.PORT,
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "entities": ["src/entity/**/*.ts"],
    "logging": process.env.TYPEORM_LOGGING, 
    "synchronize": process.env.TYPEORM_SYNCHRONIZE,
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    },
    "url": `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${POSTGRES_DB}`
};