exports.seedPet = async (model: any) => {
  const res = await fetch('https://api.thecatapi.com/v1/breeds', {
    // headers: {
    //   'x-api-key': process.env.CAT_API_KEY || '',
    // },
  });
  const data = await res.json();
  model.collection.drop();
  data.forEach(async (cat: any) => {
    const imgRes = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${cat.id}`,
      {
        headers: {
          'x-api-key': process.env.CAT_API_KEY || '',
        },
      }
    );
    const images = await imgRes.json();
    const newCat = new model({
      name: cat.name,
      alt_names: cat.alt_names,
      imageURLs: images,
      origin: cat.origin,
      country_code: cat.country_code,
      life_span: cat.life_span,
      temperament: cat.temperament,
      wikipedia_url: cat.wikipedia_url,
      weight: cat.weight,
      height: cat.height,
      adaptability: cat.adaptability,
      affection_level: cat.affection_level,
      child_friendly: cat.child_friendly,
      dog_friendly: cat.dog_friendly,
      grooming: cat.grooming,
      intelligence: cat.intelligence,
      health_issues: cat.health_issues,
      social_needs: cat.social_needs,
      stranger_friendly: cat.stranger_friendly,
      vocalisation: cat.vocalisation,
      shedding_level: cat.shedding_level,
      energy_level: cat.energy_level,
      hypoallergenic: cat.hypoallergenic,
      description: cat.description,
    });
    newCat.save((err: any, res: any) => {
      console.log(err);
      console.log(res);
      if(!err){
        console.log("Seeding completed");
      }
    });
  });
};
