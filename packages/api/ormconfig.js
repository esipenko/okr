module.exports = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: ['entities/**/*.ts'],
    migrations: ['migrations/**/*.ts'],
    cli: {
        entitiesDir: 'entitis',
        migrationsDir: 'migrations',
    },
};
