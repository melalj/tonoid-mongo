const { MongoClient } = require('mongodb');

module.exports = (
  {
    url = process.env.MONGO_URL,
    host = process.env.MONGO_HOST || 'mongo',
    port = Number(process.env.MONGO_PORT || 27017),
    username = process.env.MONGO_USERNAME || 'mongo',
    password = process.env.MONGO_PASSWORD || 'mongo',
    authDb = process.env.MONGO_AUTH_DB || 'admin',
    dbName = process.env.MONGO_DB || process.env.MONGO_DBNAME || 'test',
    compression = false,
    extendMongoClientOptions = {},
  },
  ctxName = 'mongo',
) => ({
  name: ctxName,
  init: async () => {
    const mongoClientOptions = {};

    if (compression) {
      mongoClientOptions.compressors = ['zstd'];
    }

    const mongoUrl = url || `mongodb://${username}:${password}@${host}:${port}/${authDb || ''}`;

    const mongoClient = new MongoClient(
      mongoUrl,
      { ...mongoClientOptions, ...extendMongoClientOptions },
    );
    await mongoClient.connect();

    const db = (v = dbName) => mongoClient.db(v);

    const close = () => mongoClient.close();

    return {
      name: ctxName,
      close,
      db,
    };
  },
});
