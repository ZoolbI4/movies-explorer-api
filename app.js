require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const handelError = require('./middlewares/handelError');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL_DEV } = require('./config/config');

const { NODE_ENV, MONGO_URL } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handelError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
