import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

function BreedSelector() {
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catTemperament, setCatTemperament] = useState(new Set());
  const [dogTemperament, setDogTemperament] = useState(new Set());
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [animalType, setAnimalType] = useState('');
  const navigate = useNavigate();

  const getCatBreeds = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/catBreeds`
    );
    const data = await response.json();
    setCatBreeds(data);
  };

  const getDogBreeds = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/dogBreeds`
    );
    const data = await response.json();
    setDogBreeds(data);
  };

  useEffect(() => {
    if (animalType === 'cat') {
      getCatBreeds();
    } else if (animalType === 'dog') {
      getDogBreeds();
    }
  }, [animalType]);

  useEffect(() => {
    if (catBreeds.length > 0) {
      const temperamentArray = catBreeds.flatMap((breed: any) =>
        breed?.temperament.split(',')
      );
      const uniqueTemperaments = [
        ...new Set(temperamentArray.map((temp) => temp.trim())),
      ];
      setCatTemperament(new Set(uniqueTemperaments));
    }
  }, [catBreeds]);

  useEffect(() => {
    if (dogBreeds.length > 0) {
      const temperamentArray = dogBreeds.flatMap((breed: any) =>
        breed?.temperament.split(',')
      );
      const uniqueTemperaments = [
        ...new Set(temperamentArray.map((temp) => temp.trim())),
      ];
      setDogTemperament(new Set(uniqueTemperaments));
    }
  }, [dogBreeds]);

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    setSelectedTemperaments((prev: any) =>
      checked ? [...prev, value] : prev.filter((t: any) => t !== value)
    );
  };

  const handleAnimalTypeChange = (animalType: any) => {
    setAnimalType(animalType);
    setButtonsVisible(false); // Hide the buttons after selection
  };

  const handleSubmit = () => {
    if (selectedTemperaments.length < 5) {
      alert('Please select at least 5 temperaments.');
      return;
    }

    if (selectedTemperaments.length > 7) {
      alert('Please select at most seven temperaments.');
      return;
    }

    // Handle form submission logic here
    console.log('Form submitted!');

    // Convert the selected temperaments Set to an array
    const chosenTemperaments = Array.from(selectedTemperaments);

    // Redirect to the next page with the selected choices
    navigate('/suggest', {
      state: {
        selectedTemperaments: chosenTemperaments,
        chosenPet: animalType,
      },
    });
  };

  console.log(dogBreeds);

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem' }}>Breed Selector</h1>
      <br />
      <div>
        <br />
        {buttonsVisible && (
          <>
            <h2>Choose an animal type:</h2>
            <br />
            <button
              className="bg-primary border p-2 w-32 rounded-lg mr-4 hover:bg-primary-dark"
              onClick={() => handleAnimalTypeChange('cat')}
            >
              Cat
            </button>
            <button
              className="bg-primary border p-2 w-32 rounded-lg mr-4"
              onClick={() => handleAnimalTypeChange('dog')}
            >
              Dog
            </button>
          </>
        )}
      </div>
      {animalType && (
        <>
          <h2>
            What kind of personality would you like your {animalType} to have?
            (Choose between 5 and 7)
          </h2>
          <br />
          <h2 className="font-bold">You chose {selectedTemperaments.length}</h2>

          <FormControl component="fieldset">
            <FormGroup className="mx-auto">
              <div className="grid grid-cols-4 p-4 gap-4">
                {[
                  ...(animalType === 'cat' ? catTemperament : dogTemperament),
                ].map((temp: any, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox onChange={handleCheckboxChange} />}
                    label={temp}
                    value={temp}
                  />
                ))}
              </div>
              <div className="w-32 mx-auto">
                <button
                  className="bg-primary p-4 border-2 rounded-lg ml-4 mb-4"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </FormGroup>
          </FormControl>
        </>
      )}
    </div>
  );
}

export default BreedSelector;
