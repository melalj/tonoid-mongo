const { MongoClient } = require('mongodb');

module.exports = (customOptions = {}, ctxName = 'mongo') => ({
  name: ctxName,
  init: async () => {
    const defaultConfig = {
      ...(process.env.MONGO_URL
        ? { url: process.env.MONGO_URL }
        : {
          host: process.env.MONGO_HOST || 'mongo',
          port: Number(process.env.MONGO_PORT || 27017),
          username: process.env.MONGO_USERNAME || 'mongo',
          password: process.env.MONGO_PASSWORD || 'mongo',
          auth_db: process.env.MONGO_AUTH_DB,
        }
      ),
    };

    const options = { ...defaultConfig, ...customOptions };

    const mongoUrl = (options.url)
      ? options.url
      : `mongodb://${options.username}:${options.password}@${options.host}:${options.port}/${options.auth_db ? options.auth_db : ''}`;

    const mongoClient = new MongoClient(mongoUrl);
    await mongoClient.connect();

    const db = (dbName = process.env.MONGO_DB) => mongoClient.db(dbName);

    const close = () => mongoClient.close();

    return {
      name: ctxName,
      close,
      db,
    };
  },
});
