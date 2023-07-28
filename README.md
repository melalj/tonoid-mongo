# @tonoid/mongo

![npm](https://img.shields.io/npm/dt/@tonoid/mongo.svg) ![npm](https://img.shields.io/npm/v/@tonoid/mongo.svg) ![npm](https://img.shields.io/npm/l/@tonoid/mongo.svg)
[![GitHub stars](https://img.shields.io/github/stars/melalj/tonoid-mongo.svg?style=social&label=Star&maxAge=2592003)](https://github.com/melalj/tonoid-mongo)

MongoDB plugin for [@tonoid/helpers](https://github.com/melalj/tonoid-helpers).
This plugin uses the [NodeJS MongoDb client 5](https://github.com/mongodb/node-mongodb-native).

## Init options

- `host`: (defaults: `process.env.MONGO_HOST || 'mongo'`) MongoDB host.
- `port`: (defaults: `process.env.MONGO_PORT || 27017`) MongoDB port.
- `username`: (defaults: `process.env.MONGO_USERNAME || 'mongo'`) MongoDB username.
- `password`: (defaults: `process.env.MONGO_PASSWORD || 'mongo'`) MongoDB password.
- `auth_db`: (defaults: `process.env.MONGO_AUTH_DB || 'admin'`) MongoDB authentification database.
- `url`: (defaults: `process.env.MONGO_URL`) MongoDB url, if set it overrides other auth options.

## Exported context attributes

- `.close()`: Close mongo client
- `.db(databaseName = process.env.MONGO_DB)`: Get database instance

## Usage example

```js
const { context, init } = require('@tonoid/helpers');
const mongo = require('@tonoid/mongo');

(async () => {
  await init([
    mongo({ url: 'mongodb://mongo:mongo@localhost:27017' }, 'myMongo'),
  ]);

  const mongoDb = context.myMongo.db();
  const products = await mongoDb.collection('products').find({});
  console.log(products);
})();

```

## Credits

This module is maintained by [Simo Elalj](https://twitter.com/simoelalj) @[tonoid](https://www.tonoid.com)
