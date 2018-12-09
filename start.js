const mongoose = require("mongoose");
const config = require('./src/config/config');

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });


// Connect to our Database and handle any bad connections
mongoose.connect(config.mongo_uri,
  {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: 30,
    reconnectInterval: 5000,
  })
  .then(() => console.log('----- connected to db'))
  .catch(err => console.log(err));

// Importing all of our models

require('./src/models/Recipes');

// Start the app
const app = require("./src/app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
