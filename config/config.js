const { PORT = 3000 } = process.env;

const MONGO_URL_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  PORT,
  MONGO_URL_DEV,
};
