// Avoids typescript error: Cannot redeclare block-scoped variable.
export {};

// Importing dotenv
require('dotenv').config();
const dbPort = process.env.DATABASE_PORT || 8000;

// Importing express
const express = require('express');
const app = express();

// Importing mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Connecting to MongoDB
mongoose.connect(process.env.DATABASE_URL);

// Checking if connected to MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

// Importing routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Starting server
app.listen(dbPort, () => {
  console.log('Server started on port ' + dbPort);
});
