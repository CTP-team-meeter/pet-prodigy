import { useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Breed } from '../types/breed';
import SearchBar from '../components/SearchBar';
import { getApiUrl } from '../util/util';
function Encyclopedia() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchCatData = useCallback(async () => {
    try {

      const response = await fetch(getApiUrl('catBreeds'));
      const data = await response.json();

      const catData: Breed[] = data.map((cat: Breed) => {
        const temperament = cat.temperament?.split(', ');
        return {
          _id: cat._id || 'Missing data',
          name: cat.name || 'Missing data',
          imageURLs: cat.imageURLs || ['Missing data'],
          origin: cat.origin || 'Missing data',
          temperament: temperament || 'Missing data',
          life_span: cat.life_span || 'Missing data',
          wikipedia_url: cat.wikipedia_url || 'Missing data',
          description: cat.description || 'Missing data',
          alt_names: cat.alt_names || 'Missing data',
          country_code: cat.country_code || 'Missing data',
          adaptability: cat.adaptability || -1,
          affection_level: cat.affection_level || -1,
          child_friendly: cat.child_friendly || -1,
          dog_friendly: cat.dog_friendly || -1,
          energy_level: cat.energy_level || -1,
          grooming: cat.grooming || -1,
          health_issues: cat.health_issues || -1,
          intelligence: cat.intelligence || -1,
          shedding_level: cat.shedding_level || -1,
          social_needs: cat.social_needs || -1,
          stranger_friendly: cat.stranger_friendly || -1,
          weight: cat.weight || -1,
          hypoallergenic: cat.hypoallergenic || -1,
          vocalisation: cat.vocalisation || -1,
          animal_type: cat.animal_type || 'cat',
        };
      });
      setBreeds(catData);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  }, []);

  const fetchDogData = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/dogBreeds`);
      const data = await response.json();

      const dogData: Breed[] = data.map((dog: Breed) => {
        const temperament = dog.temperament?.split(', ');
        return {
          name: dog.name || 'Missing data',
          imageURLs: dog.imageURLs || ['Missing data'],
          origin: dog.origin || 'Missing data',
          temperament: temperament || 'Missing data',
          life_span: dog.life_span || 'Missing data',
          animal_type: 'dog',
        };
      });
      setBreeds((prevBreeds) => prevBreeds.concat(dogData));
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCatData();
    fetchDogData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin width={100} height={100} color="#00BFFF" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something went wrong!</h1>
        <br />
        <br />
        <button
          className="bg-slate-900 p-4 border-2 rounded-lg ml-4 mb-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <h1 className="mb-4 max-sm:text-4xl sm:text-2xl  md:text-4xl lg:text-4xl xl:text-5xl ">
        Encyclopedia
      </h1>
      <br />
      <div className="">
        <SearchBar
          breeds={breeds.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))}
        />
      </div>
    </div>
  );
}

export default Encyclopedia;
