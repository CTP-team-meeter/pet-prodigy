// Avoids typescript from making modules global
export {};

// Importing dotenv
require('dotenv').config();
const port = process.env.PORT || 8080;

// Importing express
const express = require('express');
const app = express();

// Importing mongoose
const mongoose = require('mongoose');

// Enable CORS
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
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

/* Should be refactored into a separate module */
const seedCatbreeds = async () => {
  const CatBreed = require('./models/catBreed');
  const res = await fetch('https://api.thecatapi.com/v1/breeds');
  const data = await res.json();
  data.forEach(async (cat: any) => {
    const imgRes = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${cat.id}`);
    const images = await imgRes.json()
    const newCat =  new CatBreed({
      name: cat.name,
      imageURLs: images,
      origin: cat.origin,
      life_span: cat.life_span,
      temperament: cat.temperament,
      wikipedia_url: cat.wikipedia_url,
      weight: cat.weight,
      height: cat.height,
      adaptability: cat.adaptability,
      affection_level: cat.affection_level,
      child_friendly: cat.child_friendly,
      grooming: cat.grooming,
      intelligence: cat.intelligence,
      health_issues: cat.health_issues,
      social_needs: cat.social_needs,
      stranger_friendly: cat.stranger_friendly,
      vocalisation: cat.vocalisation,
      energy_level: cat.energy_level,
      description: cat.description
    });
    console.log(images);
    newCat.save((err: any,res: any)=>{
      console.log(err);
      console.log(res);
    });  
  });
};
seedCatbreeds();
/*  */

app.use(express.json());

// Importing routes
app.use('/api', require('./routers'));


// Starting server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
