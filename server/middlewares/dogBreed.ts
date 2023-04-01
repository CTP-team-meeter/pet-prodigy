// Get all cat breeds
exports.getBreed = async function (req: any, res: any, next: any) {
  let breed: any;
  try {
    breed = await DogBreed.findById(req.params.id);
    if (breed == null) {
      return res.status(404).json({ message: 'Cannot find breed' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.name = breed;
  next();
};
