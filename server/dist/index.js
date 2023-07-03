"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importing dotenv
require('dotenv').config();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
// Importing express
const express = require('express');
const app = express();
// Importing mongoose
const mongoose = require('mongoose');
const { seedPet } = require('./utils/petSeeder');
// Enable CORS
const cors = require('cors');
const corsOptions = {
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
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
const CatBreed = require('./models/catBreed');
CatBreed.count((err, count) => {
    if (!err && count === 0) {
        seedPet(CatBreed);
    }
});
const DogBreed = require('./models/dogBreed');
DogBreed.count((err, count) => {
    if (!err && count === 0) {
        seedPet(DogBreed);
    }
});
app.use(express.json());
// Importing routes
app.use('/api', require('./routers'));
// Starting server
app.listen(port, host, () => {
    console.log('Server started on host ' + host);
    console.log('Server started on port ' + port);
});
