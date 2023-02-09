const CatBreed = require("../models/catBreed");

// Return list of all CatBreads.
exports.catbreed_list = async (req: any, res: any) => {
  try {
    const breeds = await CatBreed.find();
    res.json(breeds);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};
