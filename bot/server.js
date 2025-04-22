// bot/server.js

const express = require('express');
const mongoose = require('mongoose');
const moviesRoute = require('bot/routes/movies');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Movies API route
app.use('/api/movies', moviesRoute);

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Movie Telegram Sync Server Running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log('MongoDB connection error:', err));
