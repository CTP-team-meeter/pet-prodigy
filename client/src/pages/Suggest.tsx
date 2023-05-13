import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Suggest() {
  const location = useLocation();
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const { selectedTemperaments } = location.state;

  const getBreeds = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/catBreeds`
    );
    const data = await response.json();
    setBreeds(data);

    console.log(data);

    const filtered = data.filter((breed: any) => {
      const breedTemperaments = breed.temperament.split(', ');
      return selectedTemperaments.some((selected: any) =>
        breedTemperaments.includes(selected)
      );
    });

    setFilteredBreeds(filtered);
  };

  useEffect(() => {
    if (selectedTemperaments && selectedTemperaments.length > 0) {
      getBreeds();
    }
  }, [selectedTemperaments]);

  const getMatchLevel = (matchedTemperaments: any) => {
    const totalTemperaments = selectedTemperaments.length;
    const matchedCount = matchedTemperaments.length;
    const matchRatio = totalTemperaments / matchedCount;

    if (matchRatio >= 0.8) {
      return 'Most Likely a Match';
    } else if (matchRatio >= 0.5) {
      return 'Likely a Match';
    } else {
      return 'Unlikely a Match';
    }
  };

  const sortBreedsByMatchLevel = (breeds: any) => {
    return breeds.sort((a: any, b: any) => {
      const matchedTemperamentsA = a.temperament.split(', ');
      const matchedTemperamentsB = b.temperament.split(', ');

      const matchLevelA = getMatchLevel(matchedTemperamentsA);
      const matchLevelB = getMatchLevel(matchedTemperamentsB);

      if (matchLevelA === 'Most Likely a Match') {
        return -1;
      } else if (matchLevelB === 'Most Likely a Match') {
        return 1;
      } else if (matchLevelA === 'Likely a Match') {
        return -1;
      } else if (matchLevelB === 'Likely a Match') {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const sortedBreeds = sortBreedsByMatchLevel(filteredBreeds);

  return (
    <div>
      <h3>Suggestion Content</h3>
      <p>Selected Temperaments: {selectedTemperaments.join(', ')}</p>
      <p>Number of breeds: {sortedBreeds.length}</p>
      <ul className="grid grid-cols-3">
        {sortedBreeds.map((breed: any) => (
          <li key={breed._id}>
            <br />
            {breed.name} - Match Level:{' '}
            {getMatchLevel(breed.temperament.split(', '))}
            <br />
            {breed.imageURLs && breed.imageURLs.length > 0 ? (
              <>
                <br />
                <img
                  className="w-96 h-96 object-cover mx-auto border-2 border-black rounded-md"
                  src={breed.imageURLs[0].url}
                  alt={breed.name}
                />
                <br />
                <Link
                  className="text-blue-500 hover:text-blue-800"
                  to={`/encyclopedia/${encodeURIComponent(breed.name)}`}
                >
                  Want to know more about this breed?
                </Link>
              </>
            ) : (
              'No Image'
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggest;
