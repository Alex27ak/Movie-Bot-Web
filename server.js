const express = require('express');
const mongoose = require('mongoose');
const moviesRoute = require('./routes/movies');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve frontend files from the "public" directory
app.use(express.static('public'));

// API routes
app.use('/api/movies', moviesRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Movie Telegram Sync Server Running!');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}).catch(err => console.log('MongoDB connection error:', err));
