import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

interface CatBreed {
  id: string;
  breed: string;
  image: string;
  origin?: string;
  temperament?: string;
  status?: Array<number>;
}

function Home() {
  const [catBreed, setCatBreed] = useState<CatBreed>({
    id: '',
    breed: '',
    image: '',
    origin: 'Unknown',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  let stars = new Array(5);
  let adaptability = [];
  let affection_level = [];
  let child_friendly = [];
  let dog_friendly = [];
  let energy_level = [];
  let grooming = [];
  let health_issues = [];
  let intelligence = [];
  let shedding_level = [];
  let social_needs = [];
  let stranger_friendly = [];
  let vocalisation = [];

  const getCat = async () => {
    try {
      setLoading(true);
      const catBreedsNumber = 66;

      // Get cat breed
      const randomIndex = Math.floor(Math.random() * catBreedsNumber);
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await response.json();
      const cat = data[randomIndex];

      // Get cat image
      const catImage = await fetch(
        'https://api.thecatapi.com/v1/images/search?breed_ids=' + cat.id
      );
      const catImageJson = await catImage.json();
      const catImageURL = catImageJson[0].url;
      console.log(cat);

      setCatBreed({
        id: cat.id,
        breed: cat.name,
        image: catImageURL,
        origin: cat.origin,
        temperament: cat.temperament,
        status: [
          cat.adaptability,
          cat.affection_level,
          cat.child_friendly,
          cat.dog_friendly,
          cat.energy_level,
          cat.grooming,
          cat.health_issues,
          cat.intelligence,
          cat.shedding_level,
          cat.social_needs,
          cat.stranger_friendly,
          cat.vocalisation,
        ],
      });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  if (loading)
    return (
      <TailSpin
        height="30"
        width="30"
        color="#00FFFF"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
        }}
        wrapperClass="mt-72"
        visible={true}
      />
    );

  if (error || !catBreed.status) {
    return (
      <div>
        <h1 className="mb-6">Something went wrong!</h1>
        <button onClick={refreshPage}>Click here to refresh</button>
      </div>
    );
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[0]) {
      adaptability.push(<span className="fa fa-star p-1"></span>);
    } else adaptability.push(<span className="fa fa-star checked p-1"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[1]) {
      affection_level.push(<span className="fa fa-star p-1"></span>);
    } else
      affection_level.push(<span className="fa fa-star checked p-1"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[2]) {
      child_friendly.push(<span className="fa fa-star p-1"></span>);
    } else {
      child_friendly.push(<span className="fa fa-star p-1 checked"></span>);
    }
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[3]) {
      dog_friendly.push(<span className="fa fa-star p-1"></span>);
    } else dog_friendly.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[4]) {
      energy_level.push(<span className="fa fa-star p-1"></span>);
    } else energy_level.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[5]) {
      grooming.push(<span className="fa fa-star p-1"></span>);
    } else grooming.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[6]) {
      health_issues.push(<span className="fa fa-star p-1"></span>);
    } else health_issues.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[7]) {
      intelligence.push(<span className="fa fa-star p-1"></span>);
    } else intelligence.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[8]) {
      shedding_level.push(<span className="fa fa-star p-1"></span>);
    } else
      shedding_level.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[9]) {
      social_needs.push(<span className="fa fa-star p-1"></span>);
    } else social_needs.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[10]) {
      stranger_friendly.push(<span className="fa fa-star p-1"></span>);
    } else
      stranger_friendly.push(<span className="fa fa-star p-1 checked"></span>);
  }

  for (let i = 0; i < stars.length; i++) {
    if (i >= catBreed.status[11]) {
      vocalisation.push(<span className="fa fa-star p-1"></span>);
    } else vocalisation.push(<span className="fa fa-star p-1 checked"></span>);
  }

  return (
    <>
      <div className="mx-auto w-fit">
        <h1 className="text-3xl mb-2">{catBreed.breed}</h1>
        <img
          style={{ width: '800px', height: '500px' }}
          className="mb-2 rounded-lg object-cover"
          src={catBreed.image}
          alt="character"
        />
        <div
          style={{ width: '800px' }}
          className="bg-black mb-3 text-white rounded-lg text-justify text-lg"
        >
          <p className="p-2">Origin: {catBreed.origin}</p>
          <p className="p-2">Temperament: {catBreed.temperament}</p>
          <p className="p-2">Adaptibility:{<>{adaptability}</>}</p>
          <p className="p-2">Affection Level:{<>{affection_level}</>}</p>
          <p className="p-2">Child Friendly:{<>{child_friendly}</>}</p>
          <p className="p-2">Dog Friendly: {<>{dog_friendly}</>}</p>
          <p className="p-2">Energy Level:{<>{energy_level}</>}</p>
          <p className="p-2">Grooming: {<>{grooming}</>}</p>
          <p className="p-2">Health Issues: {<>{health_issues}</>}</p>
          <p className="p-2">Intelligence: {<>{intelligence}</>}</p>
          <p className="p-2">Shedding Level: {<>{shedding_level}</>}</p>
          <p className="p-2">Social Needs: {<>{social_needs}</>}</p>
          <p className="p-2">Stranger Friendly: {<>{stranger_friendly}</>}</p>
          <p className="p-2">Vocalisation: {<>{vocalisation}</>}</p>
        </div>

        <button className="mb-4" onClick={getCat}>
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
