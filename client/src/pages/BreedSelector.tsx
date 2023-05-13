import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

function BreedSelector() {
  const [breeds, setBreeds] = useState([]);
  const [temperament, setTemperament] = useState(new Set());
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const navigate = useNavigate();

  const getBreeds = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/catBreeds`
    );
    const data = await response.json();
    setBreeds(data);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  useEffect(() => {
    if (breeds.length > 0) {
      const temperamentArray = breeds.flatMap((breed: any) =>
        breed.temperament.split(',')
      );
      setTemperament(new Set(temperamentArray));
    }
  }, [breeds]);

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    setSelectedTemperaments((prev: any) =>
      checked ? [...prev, value] : prev.filter((t: any) => t !== value)
    );
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted!');

    // Convert the selected temperaments Set to an array
    const chosenTemperaments = Array.from(selectedTemperaments);

    // Redirect to the next page with the selected choices
    navigate('/suggest', {
      state: { selectedTemperaments: chosenTemperaments },
    });
  };

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem' }}>Breed Selector</h1>
      <br />
      <h2>How would you like your pet temperament to be?</h2>

      <FormControl component="fieldset">
        <FormGroup className="mx-auto">
          <div className="grid grid-cols-4 p-4 gap-4">
            {[...temperament].map((temp, index) => (
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
              className="bg-slate-900 p-4 border-2 rounded-lg ml-4 mb-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default BreedSelector;
