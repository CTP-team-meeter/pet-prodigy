// Avoids typescript from making global modules
export {};

const mongoose = require('mongoose');

const catBreedSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  adaptability: { type: Number, required: false },
  affection_level: { type: Number, required: false },
  child_friendly: { type: Number, required: false },
  grooming: { type: Number, required: false },
  intelligence: { type: Number, required: false },
  health_issues: { type: Number, required: false },
  social_needs: { type: Number, required: false },
  stranger_friendly: { type: Number, required: false },
  vocalisation: { type: Number, required: false },
  energy_level: { type: Number, required: false },
  description: { type: String, required: false },
  imageURLs: { type: Object, required: true },
  origin: { type: String, required: false },
  life_span: { type: String, required: false },
  temperament: { type: String, required: false },
  wikipedia_url: { type: String, required: false },
  weight: { type: Object, required: false },
  height: { type: String, required: false },
});

module.exports = mongoose.model('CatBreed', catBreedSchema);
