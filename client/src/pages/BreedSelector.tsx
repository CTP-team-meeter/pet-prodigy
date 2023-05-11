import { useEffect, useState } from 'react';

function BreedSelector() {
  const [breeds, setBreeds] = useState([]);
  const [temperament, setTemperament] = useState({} as any);

  const getBreeds = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/catBreeds`
    );
    const data = await response.json();
    setBreeds(data);
    setTemperament(data[0].temperament.split(', '));
  };

  useEffect(() => {
    getBreeds();
  }, []);

  return <div>BreedSelector</div>;
}

export default BreedSelector;
