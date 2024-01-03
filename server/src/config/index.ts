import convict from "convict";

const conf = convict({
  env: {
    format: ['development', 'production', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    port: {
      format: 'port',
      default: 3000,
      env: 'APP_PORT',
    },
  },
  database: {
    connection: {
      format: 'String',
      default: 'mongodb://mongo:27017/nest-auth-app',
      env: 'DB_CONNECTION_STRING',
    },
    poolSize: {
      format: 'int',
      default: 10,
      env: 'POOL_SIZE',
    },
  },
});

conf.validate({ allowed: 'strict' });

export default conf.getProperties();
