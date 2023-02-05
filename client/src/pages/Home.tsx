import { useCallback, useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { TailSpin } from 'react-loader-spinner';
import Modal from 'react-modal';
import ReactCountryFlag from 'react-country-flag';
import StarRatings from 'react-star-ratings';
import Slider from 'react-slick';

interface Cat {
  id: number;
  name: string;
  images: string;
  origin: string;
  temperament: Array<string>;
  life_span: string;
  wikipedia_url: string;
  description: string;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  weight: {
    imperial: string;
    metric: string;
  };
  country_code: string;
  hypoallergenic: number;
}

// Set Modal to root
Modal.setAppElement('#root');

function Encyclopedia() {
  const [cats, setCats] = useState<Array<Cat>>([]);
  const [cat, setCat] = useState<Cat>();
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const catBreeds = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await catBreeds.json();
      const promises = data.map(async (breed: any) => {
        const resultImage = await fetch(
          'https://api.thecatapi.com/v1/images/search?breed_ids=' + breed.id
        );
        const dataImage = await resultImage.json();
        const temperament = breed.temperament?.split(', ');

        if (dataImage && dataImage[0 && dataImage[0].url]) {
          return {
            id: breed.id,
            name: breed.name || 'Missing data',
            images: dataImage[0].url || 'Missing data',
            origin: breed.origin || 'Missing data',
            temperament: temperament || 'Missing data',
            life_span: breed.life_span || 0,
            wikipedia_url: breed.wikipedia_url || 'Missing data',
            description: breed.description || 'Missing data',
            alt_names: breed.alt_names || 'Missing data',
            adaptability: breed.adaptability || 0,
            affection_level: breed.affection_level || 0,
            child_friendly: breed.child_friendly || 0,
            dog_friendly: breed.dog_friendly || 0,
            energy_level: breed.energy_level || 0,
            grooming: breed.grooming || 0,
            health_issues: breed.health_issues || 0,
            intelligence: breed.intelligence || 0,
            shedding_level: breed.shedding_level || 0,
            social_needs: breed.social_needs || 0,
            stranger_friendly: breed.stranger_friendly || 0,
            weight: breed.weight || 'Missing data',
            country_code: breed.country_code || 'Missing data',
            hypoallergenic: breed.hypoallergenic || 0,
          };
        }
      });

      const catsPromise = await Promise.all(promises);
      setCats(catsPromise.filter(Boolean));
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  }, []);

  const catInformation = async (id: number) => {
    try {
      setLoading(true);
      const catBreed = await fetch('https://api.thecatapi.com/v1/breeds/' + id);
      const data = await catBreed.json();
      const temperament = data.temperament?.split(', ');

      const catImage = await fetch(
        'https://api.thecatapi.com/v1/images/search?breed_ids=' +
          id +
          '&limit=5'
      );
      const dataImage = await catImage.json();

      dataImage.map((image: any) => {
        console.log(image);
      });

      const cat = {
        id: data.id,
        name: data.name || 'Missing data',
        images: dataImage ? dataImage : 'Missing data',
        origin: data.origin || 'Missing data',
        temperament: temperament || 'Missing data',
        life_span: data.life_span || 0,
        wikipedia_url: data.wikipedia_url || 'Missing data',
        description: data.description || 'Missing data',
        alt_names: data.alt_names || 'Missing data',
        adaptability: data.adaptability || 0,
        affection_level: data.affection_level || 0,
        child_friendly: data.child_friendly || 0,
        dog_friendly: data.dog_friendly || 0,
        energy_level: data.energy_level || 0,
        grooming: data.grooming || 0,
        health_issues: data.health_issues || 0,
        intelligence: data.intelligence || 0,
        shedding_level: data.shedding_level || 0,
        social_needs: data.social_needs || 0,
        stranger_friendly: data.stranger_friendly || 0,
        weight: data.weight || 'Missing data',
        country_code: data.country_code || 'Missing data',
        hypoallergenic: data.hypoallergenic || 0,
      };

      setCat(cat);
      setLoading(false);

      return cat;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  };

  const openModal = (selectedCat: Cat) => {
    setModal(true);
    setCat(selectedCat);
  };

  const closeModal = () => {
    setModal(false);
  };

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
    <div>
      <h1 className="mb-4">Encyclopedia</h1>
      <br />
      <input
        className="w-8/12 mt-4 mb-14 p-2 border-2 rounded-lg"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="bg-slate-900 p-3 border-2 rounded-lg ml-4 mb-4">
        Random cat
      </button>
      <div className="bg-slate-900 p-4 border-2 rounded-lg grid grid-cols-3 gap-4">
        {cats

          .filter((cat: Cat) => {
            if (search === '') {
              return cat;
            } else if (cat.name.toLowerCase().includes(search.toLowerCase())) {
              return cat;
            }
          })
          .map((cat: Cat) => (
            <div className="sm:text-lg md:text-2xl text-xs  " key={cat.id}>
              <h2 className="mb-4">{cat.name}</h2>
              <LazyLoad>
                <div
                  onClick={() => {
                    openModal(cat);
                  }}
                  className="bg-slate-900 border-2 rounded-lg mb-10 cursor-crosshair hover:opacity-60"
                  style={{
                    backgroundImage: `url(${cat.images})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '600px',
                  }}
                ></div>
              </LazyLoad>
            </div>
          ))}
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          contentLabel="Cat information"
        >
          <div className="flex">
            <div className="w-full">
              <h2 className="w-3/12 text-center font-bold mb-2">{cat?.name}</h2>
              <div className="flex">
                <div className="flex-col">
                  <div
                    style={{
                      backgroundImage: `url(${cat?.images})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: '300px',
                      height: '400px',
                    }}
                    className="w-6/12 border rounded-lg"
                  ></div>
                  <div className="flex justify-center items-center mt-2">
                    <h1 className="w-6/12 text-end text-xs mb-2">
                      Life Span(Y):&nbsp;
                      {cat?.life_span}
                    </h1>
                    &nbsp;&nbsp;
                    <h1 className="w-6/12 text-xs mb-3">
                      Weight(KG):&nbsp;
                      {cat?.weight.imperial}
                    </h1>
                  </div>
                </div>

                <div className="w-9/12 ml-4">
                  <p>
                    {cat?.origin}&nbsp;&nbsp;
                    <ReactCountryFlag
                      countryCode={
                        cat?.country_code ? cat.country_code : 'Unknown'
                      }
                      svg
                    />
                    <a
                      className="text-sm text-white bg-gray-500 hover:text-slate-900 p-2 rounded-lg ml-8"
                      href={cat?.wikipedia_url}
                      target="_blank"
                    >
                      Wikipedia
                    </a>
                  </p>
                  <h1 className="text-sm mt-8 mb-3">
                    {cat?.temperament.map((temp: string) => (
                      <span className="text-xs bg-cyan-600 rounded-lg p-2 mb-3 mr-2">
                        {temp}
                      </span>
                    ))}
                    {cat?.hypoallergenic === 1 ? (
                      <span className="text-xs bg-yellow-500 rounded-lg p-2 mb-3 ">
                        Hypoallergenic
                      </span>
                    ) : null}
                  </h1>
                  <div className="flex justify-center items-center text-center mt-14">
                    <h1 className="w-3/12 text-sm mb-2">
                      Adaptability &nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.adaptability}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Affection&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.affection_level}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Child Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.child_friendly}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Dog Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.dog_friendly}
                      />
                    </h1>
                  </div>
                  <div className="flex justify-center items-center text-center mt-6">
                    <h1 className="w-3/12 text-sm text-center mb-2">
                      Stranger Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.stranger_friendly}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Energy&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.energy_level}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Grooming&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.grooming}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Health Issues&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.health_issues}
                      />
                    </h1>
                  </div>
                  <div className="flex items-center justify-center text-center mt-6">
                    <h1 className="w-3/12 text-sm mb-2">
                      Intelligence&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.intelligence}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Shedding&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.shedding_level}
                      />
                    </h1>
                    <h1 className="w-3/12 text-center text-sm mb-2">
                      Social Needs&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={cat?.social_needs}
                      />
                    </h1>
                  </div>
                </div>
              </div>
              <br />
              <p>
                <span className="text-lg font-bold">Description:</span>{' '}
                {cat?.description}
              </p>
            </div>

            <div className="text-end">
              <button className="bg-transparent" onClick={closeModal}>
                <span role="img" aria-label="close">
                  ❌
                </span>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Encyclopedia;
