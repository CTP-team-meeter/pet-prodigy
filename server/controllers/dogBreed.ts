const DogBreed = require('../models/dogBreed');

// Return list of all DogBreads.
exports.dogbreed_list = async (req: any, res: any) => {
  try {
    const breeds = await DogBreed.find();
    res.json(breeds);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};
