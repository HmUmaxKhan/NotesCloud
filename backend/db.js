const mongoose = require('mongoose');

const connectToDb = () => {
  mongoose.connect(
    'mongodb://127.0.0.1:27017/inotes?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3',
    { useNewUrlParser: true, useUnifiedTopology: true },
  ).then(() => {console.log("Connected to Mongoose")})
};

module.exports = connectToDb;
