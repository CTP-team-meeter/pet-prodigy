// Avoids typescript from making global modules
export {};

const mongoose = require('mongoose');

const dogBreedSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  breed_group: { type: String, required: false },
  imageURLs: { type: Object, required: true },
  origin: { type: String, required: false },
  life_span: { type: String, required: false },
  temperament: { type: String, required: false },
  wikipedia_url: { type: String, required: false },
});

module.exports = mongoose.model('dogBreed', dogBreedSchema);
