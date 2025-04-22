const express = require('express');
const mongoose = require('mongoose');
const moviesRoute = require('./routes/movies');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/movies', moviesRoute);

app.get('/', (req, res) => {
  res.send('Movie Telegram Sync Server Running!');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}).catch(err => console.log('MongoDB connection error:', err));