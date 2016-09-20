function getEnvironmentVariable(name) {
    if (process.env[name] == undefined) {
        throw Error('process.env.' + name + '  is not set!');
    }

    return process.env[name];
}

exports.knexConfig = {
    client: getEnvironmentVariable("DATABASE_CLIENT"),
    connection: {
        host: getEnvironmentVariable("DATABASE_HOST"),
        port: getEnvironmentVariable("DATABASE_PORT"),
        database: getEnvironmentVariable("DATABASE_DATABASE"),
        user: getEnvironmentVariable("DATABASE_USERNAME"),
        password: getEnvironmentVariable("DATABASE_PASSWORD")
    },
    pool: {
        min: 5,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};