# @tonoid/mongo

MongoDB plugin for [@tonoid/helpers](https://github.com/melalj/tonoid-helpers)

## Init options

- `host`: (defaults: `process.env.MONGO_HOST || 'mongo'`) MongoDB host.
- `port`: (defaults: `process.env.MONGO_PORT || 27017`) MongoDB port.
- `username`: (defaults: `process.env.MONGO_USERNAME || 'mongo'`) MongoDB username.
- `password`: (defaults: `process.env.MONGO_PASSWORD || 'mongo'`) MongoDB password.
- `db`: (defaults: `process.env.MONGO_DB || 'admin'`) MongoDB database.
- `auth_db`: (defaults: `process.env.MONGO_AUTH_DB || 'admin'`) MongoDB authentification database.
- `url`: (defaults: `process.env.MONGO_URL`) MongoDB url, if set it overrides other auth options.

## Exported context attributes

- `.close()`: Close mongo client
- `.db(databaseName = process.env.MONGO_URL)`: Get database instance

## Usage example

```js
const { context, init } = require('@tonoid/helpers');
const mongo = require('@tonoid/mongo');

(async () => {
  await init([
    mongo(),
  ]);

  const mongoDb = context.mongo.db();
  const products = await mongoDb.collection('products').find({});
  console.log(products);
})();

```

## Credits

This module is maintained by [tonoid](https://www.tonoid.com)
