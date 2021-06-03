const mongoose = require("mongoose");
require("dotenv").config();

const initializeDbConnection = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Db connection successfull");
    mongoose.connection.db.listCollections().toArray((error, collections) => {
      console.log(collections);
    });
  } catch (error) {
    console.log(error);
    console.log("Could not connect to Db");
  }
};

module.exports = { initializeDbConnection };
