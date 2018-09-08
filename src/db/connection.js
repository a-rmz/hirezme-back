// Import the mongoose module
const mongoose = require('mongoose');

// Set up default mongoose connection

const buildConnectionString = () => {
  const {
    MONGO_HOST, MONGO_PORT = 27017, MONGO_DBNAME, MONGO_USER, MONGO_PASS,
  } = process.env;

  let connectionString = 'mongodb://';
  if (MONGO_USER && MONGO_PASS) {
    connectionString = `${connectionString}${MONGO_USER}:${MONGO_PASS}@`;
  }
  connectionString = `${connectionString}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;

  return connectionString;
};

mongoose.connect(buildConnectionString(), { useNewUrlParser: true });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
