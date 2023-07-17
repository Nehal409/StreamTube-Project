const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bunyan = require('bunyan');
const Path = require('path');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');

dotenv.config();
const log = bunyan.createLogger({ name: 'server' });
const app = express();
const port = 7000;

// Parse URL-encoded and JSON bodies
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router setup
const routes = require(Path.join(__dirname, './routes/'));
const router = express.Router();

routes(router);
app.use('/api', router);

app.use(errorMiddleware)

// Load models
const models = require(Path.join(__dirname, './models/'));

// MongoDB configs
const db = process.env.MONGO_URI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// db connection
const connect = () => {
  mongoose
    .connect(db, dbOptions)
    .then(() => {
      log.info('Database connection successful...');
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(port, () => {
  connect();
  log.info(`Server running on port ${port}`);
});
