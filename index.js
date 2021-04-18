const { MongoClient } = require('mongodb');

const defaultConfig = {
  ...(process.env.MONGO_URL
    ? { url: process.env.MONGO_URL }
    : {
      host: process.env.MONGO_HOST || 'mongo',
      port: Number(process.env.MONGO_PORT || 27017),
      username: process.env.MONGO_USERNAME || 'mongo',
      password: process.env.MONGO_PASSWORD || 'mongo',
      db: process.env.MONGO_DB || 'admin',
      auth_db: process.env.MONGO_AUTH_DB || process.env.MONGO_DB,
    }
  ),
};

const init = (options = defaultConfig) => async () => {
  const mongoUrl = (options.url)
    ? options.url
    : `mongodb://${options.username}:${options.password}@${options.host}:${options.port}/${options.auth_db}`;

  const mongoClient = new MongoClient(mongoUrl, { useUnifiedTopology: true });
  await mongoClient.connect();

  const db = (dbName = process.env.MONGO_DATABASE) => mongoClient.db(dbName);

  const close = () => mongoClient.close();

  return {
    close,
    db,
  };
};

const mongoModule = module.exports = init; // eslint-disable-line no-multi-assign
mongoModule.name = 'mongo';
