"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var catBreedSchema = new mongoose.Schema({
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
    imageURL: { type: String, required: true },
    origin: { type: String, required: false },
    life_span: { type: String, required: false },
    temperament: { type: String, required: false },
    wikipedia_url: { type: String, required: false },
    weight: { type: String, required: false },
    height: { type: String, required: false },
});
module.exports = mongoose.model('CatBreed', catBreedSchema);
