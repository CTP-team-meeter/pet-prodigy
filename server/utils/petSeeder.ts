exports.seedPet = async (model: any) => {
  const res = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await res.json();
  model.collection.drop();
  data.forEach(async (cat: any) => {
    const imgRes = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${cat.id}`
    );
    const images = await imgRes.json();
    const newCat = new model({
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
      description: cat.description,
    });
    console.log(images);
    newCat.save((err: any, res: any) => {
      console.log(err);
      console.log(res);
    });
  });
};
