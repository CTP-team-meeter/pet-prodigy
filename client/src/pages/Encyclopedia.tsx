import { useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { CatBreed } from '../types/cat';
import SearchBar from '../components/SearchBar';

function Encyclopedia() {
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('api/catBreeds');
      const data = await response.json();

      const catData: CatBreed[] = data
        .map((cat: CatBreed) => {
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
          };
        })
        .sort((a: any, b: any) => (a.name > b.name ? 1 : -1));

      setCatBreeds(catData);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
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
      <h1 className="mb-4">Encyclopedia</h1>
      <br />
      <div className="mt-4 mb-14 w-10/12 mx-auto">
        <SearchBar breeds={catBreeds} />
      </div>
    </div>
  );
}

export default Encyclopedia;
