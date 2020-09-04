const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogController');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;