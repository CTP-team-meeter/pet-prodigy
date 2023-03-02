import { useCallback, useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { TailSpin } from 'react-loader-spinner';
import Modal from 'react-modal';
import ReactCountryFlag from 'react-country-flag';
import StarRatings from 'react-star-ratings';
import { CatBreed } from '../global/cat';
import CarouselSlider from '../components/CarouselSlider';

// Set Modal to root
Modal.setAppElement('#root');

function Encyclopedia() {
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const [catBreed, setCatBreed] = useState<CatBreed>();
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
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

  const catBreedInformation = async (id: string) => {
    try {
      catBreeds.map((cat: CatBreed) => {
        if (cat._id === id) {
          setCatBreed(cat);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  };

  const getRandomCat = () => {
    try {
      openModal(catBreeds[Math.floor(Math.random() * catBreeds.length)]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  };

  const openModal = (selectedCat: CatBreed) => {
    setModal(true);
    catBreedInformation(selectedCat._id);
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
      <h1 className="mb-4 mt-10">Encyclopedia</h1>
      <br />
      <div className="mt-4 mb-14">
        <input
          className="w-8/12 p-2 border-2 mb-4 rounded-lg"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={getRandomCat}
          className="bg-slate-900 p-3 border-2 rounded-lg ml-4 mb-4"
        >
          Random cat
        </button>
      </div>
      <div className="bg-slate-900 p-4 border-2 rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 gap-4 text-center">
        {catBreeds
          .filter((cat: CatBreed) => {
            if (search === '') {
              return cat;
            } else if (cat.name.toLowerCase().includes(search.toLowerCase())) {
              return cat;
            }
          })
          .map((cat: CatBreed) => (
            <div className="text-lg" key={cat._id}>
              <h2 className="mb-4">{cat.name}</h2>
              <LazyLoad>
                <img
                  width={30}
                  onClick={() => {
                    openModal(cat);
                  }}
                  src={cat.imageURLs[0]?.url}
                  className="w-full h-80 bg-slate-900 border-2 rounded-lg cursor-crosshair hover:opacity-60 mx-auto mb-10 object-cover"
                />
              </LazyLoad>
              <img
                width={30}
                className="mx-auto mt-4 mb-4"
                src="/paw.png"
                alt="paw"
              />
            </div>
          ))}

        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          contentLabel="Cat information"
        >
          <div className="flex">
            <div className="w-full">
              <div className="text-end xl:float-right lg:float-right">
                <button className="bg-transparent" onClick={closeModal}>
                  <span role="img" aria-label="close">
                    ❌
                  </span>
                </button>
              </div>
              <div className="md:flex md:flex-col lg:flex lg:flex-row ">
                <div className="flex justify-center">
                  <div className="w-96 h-96 ">
                    <h2 className="w-full text-center font-bold mb-2 mx-auto">
                      {catBreed?.name}
                      <br />
                      <span className=" text-end text-xs mb-2">
                        Life Span(Y):&nbsp;
                        {catBreed?.life_span}
                      </span>
                      &nbsp;&nbsp;
                      <span className=" text-xs mb-3">
                        Weight(KG):&nbsp;
                        {catBreed?.weight?.metric}
                      </span>
                    </h2>
                    <CarouselSlider props={catBreed} />
                  </div>
                </div>
                <div className="flex flex-col ml-4 w-full">
                  <div className="headline w-full mx-auto lg:text-left text-center xl:mt-0 mt-4">
                    <p className="inline-block lg:mt-20 lg:text-left mt-24 text-center">
                      {catBreed?.origin}&nbsp;&nbsp;
                      <ReactCountryFlag
                        countryCode={
                          catBreed?.country_code
                            ? catBreed.country_code
                            : 'Unknown'
                        }
                        svg
                      />
                    </p>
                    <a
                      className="inline-block text-sm text-white bg-gray-500 hover:text-slate-900 p-2 rounded-lg ml-8"
                      href={catBreed?.wikipedia_url}
                      target="_blank"
                    >
                      Wikipedia
                    </a>
                  </div>
                  <div className="xl:justify-start lg:justify-start sm:justify-center">
                    <h1 className="flex flex-wrap justify-center mt-10 xl:justify-start lg:justify-start ">
                      {catBreed?.temperament.map((temp: string) => (
                        <span className="text-xs bg-cyan-600 rounded-lg p-2 mb-3 mr-2 break-all">
                          {temp}
                        </span>
                      ))}
                      {catBreed?.hypoallergenic === 1 ? (
                        <span className="text-xs bg-yellow-500 rounded-lg p-2 mb-3 ">
                          Hypoallergenic
                        </span>
                      ) : null}
                    </h1>
                  </div>
                  <div className="flex justify-center text-center mt-8 flex-col md:flex-row xl:flex-row">
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Adaptability &nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.adaptability}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Affection&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.affection_level}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Child Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.child_friendly}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Dog Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.dog_friendly}
                      />
                    </h1>
                  </div>
                  <div className="flex justify-center text-center  flex-col xl:flex-row md:flex-row">
                    <h1 className="xl:w-3/12 text-sm text-center mb-2 p-2">
                      Stranger Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.stranger_friendly}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Energy&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.energy_level}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Grooming&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.grooming}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Health Issues&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.health_issues}
                      />
                    </h1>
                  </div>
                  <div className="flex justify-center text-center  flex-col xl:flex-row md:flex-row">
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2 ">
                      Intelligence&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.intelligence}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Shedding&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.shedding_level}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-center text-sm mb-2 p-2">
                      Social Needs&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.social_needs}
                      />
                    </h1>
                    <h1 className="xl:w-3/12 text-sm mb-2 p-2">
                      Vocalisation&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.vocalisation}
                      />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div>
            <p className="xl:mt-32 mt-10">
              <span className="text-lg font-bold">Description:&nbsp;</span>
              {catBreed?.description}
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Encyclopedia;
