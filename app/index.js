const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');

const config = require("../src/configs/config");
config.configure();
const errorHandler = require("../src/middlewares/errorHandler/errorHandler.middleware");
const swaggerSpec = require('../src/configs/swagger');
const healthRoute = require('../src/routes/healthRoute');
const authRoute = require('../src/routes/authRoute');
const usersRoute = require('../src/routes/usersRoute');

const getMongoConnectionString = require("../src/configs/database");

const app = express();

mongoose.connect(
  getMongoConnectionString(
    config.getVariable("mongoUser"),
    config.getVariable("mongoPassword"),
    config.getVariable("mongoHost"),
    config.getVariable("mongoPort"),
    config.getVariable("mongoDbName")
  ),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(errorHandler);
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', healthRoute);
app.use('/api', authRoute);
app.use('/api', usersRoute);
app.use('/parseplatform/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
