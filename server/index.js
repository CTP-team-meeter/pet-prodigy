"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importing dotenv
require('dotenv').config();
var dbPort = process.env.DATABASE_PORT || 8080;
// Importing express
var express = require('express');
var app = express();
// Importing mongoose
var mongoose = require('mongoose');
// Enable CORS
var cors = require('cors');
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Avoids deprecation warnings
mongoose.set('strictQuery', false);
// Connecting to MongoDB
mongoose.connect(process.env.DATABASE_URL);
// Checking if connected to MongoDB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
app.use(express.json());
// Importing routes
app.use('/', require('./controllers'));
// Starting server
app.listen(dbPort, function () {
    console.log('Server started on port ' + dbPort);
});
