import { Fragment, useCallback, useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { TailSpin } from 'react-loader-spinner';
import Modal from 'react-modal';
import ReactCountryFlag from 'react-country-flag';
import StarRatings from 'react-star-ratings';
import { CatBreed } from '../global/cat';
import Slider from 'react-slick';

// Set Modal to root
Modal.setAppElement('#root');

function Encyclopedia() {
  const [catBreeds, setCatBreeds] = useState<Array<CatBreed>>([]);
  const [catBreed, setCatBreed] = useState<CatBreed>();
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await response.json();
      const promises = data.map(async (breed: any) => {
        const resultImage = await fetch(
          'https://api.thecatapi.com/v1/images/search?breed_ids=' + breed.id
        );
        const dataImage = await resultImage.json();
        const temperament = breed.temperament?.split(', ');

        if (dataImage && dataImage[0] && dataImage[0].url) {
          return {
            id: breed.id,
            life_span: breed.life_span || 'Missing data',
            adaptability: breed.adaptability || 'Missing data',
            affection_level: breed.affection_level || 'Missing data',
            child_friendly: breed.child_friendly || 'Missing data',
            dog_friendly: breed.dog_friendly || 'Missing data',
            energy_level: breed.energy_level || 'Missing data',
            grooming: breed.grooming || 'Missing data',
            health_issues: breed.health_issues || 'Missing data',
            intelligence: breed.intelligence || 'Missing data',
            shedding_level: breed.shedding_level || 'Missing data',
            social_needs: breed.social_needs || 'Missing data',
            stranger_friendly: breed.stranger_friendly || 'Missing data',
            hypoallergenic: breed.hypoallergenic || 'Missing data',
            vocalisation: breed.vocalisation || 'Missing data',
            wikipedia_url: breed.wikipedia_url || 'Missing data',
            description: breed.description || 'Missing data',
            alt_names: breed.alt_names || 'Missing data',
            weight: breed.weight || 'Missing data',
            country_code: breed.country_code || 'Missing data',
            name: breed.name || 'Missing data',
            images: dataImage[0].url || 'Missing data',
            origin: breed.origin || 'Missing data',
            temperament: temperament || 'Missing data',
          };
        }
      });

      const catsPromise = await Promise.all(promises);
      setCatBreeds(catsPromise.filter(Boolean));
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  }, []);

  const catBreedInformation = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch('https://api.thecatapi.com/v1/breeds/' + id);
      const data = await response.json();
      const temperament = data.temperament?.split(', ');

      const catImage = await fetch(
        'https://api.thecatapi.com/v1/images/search?breed_ids=' +
          id +
          '&limit=5'
      );
      const dataImage = await catImage.json();

      const cat = {
        id: data.id,
        name: data.name || 'Missing data',
        images: dataImage || 'Missing data',
        origin: data.origin || 'Missing data',
        temperament: temperament || 'Missing data',
        life_span: data.life_span || 'Missing data',
        wikipedia_url: data.wikipedia_url || 'Missing data',
        description: data.description || 'Missing data',
        alt_names: data.alt_names || 'Missing data',
        adaptability: data.adaptability || 'Missing data',
        affection_level: data.affection_level || 'Missing data',
        child_friendly: data.child_friendly || 'Missing data',
        dog_friendly: data.dog_friendly || 'Missing data',
        energy_level: data.energy_level || 'Missing data',
        grooming: data.grooming || 'Missing data',
        health_issues: data.health_issues || 'Missing data',
        intelligence: data.intelligence || 'Missing data',
        shedding_level: data.shedding_level || 'Missing data',
        social_needs: data.social_needs || 'Missing data',
        stranger_friendly: data.stranger_friendly || 'Missing data',
        weight: data.weight || 'Missing data',
        country_code: data.country_code || 'Missing data',
        hypoallergenic: data.hypoallergenic || 'Missing data',
        vocalisation: data.vocalisation || 'Missing data',
      };

      setCatBreed(cat);
      setLoading(false);

      return cat;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log(error);
    }
  };

  const openModal = (selectedCat: CatBreed) => {
    setModal(true);
    catBreedInformation(selectedCat.id);
  };

  const closeModal = () => {
    setModal(false);
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  console.log(catBreed?.images);

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
      <div className="bg-slate-900 p-4 border-2 rounded-lg grid grid-cols-4 gap-4 text-center">
        {catBreeds
          .filter((cat: CatBreed) => {
            if (search === '') {
              return cat;
            } else if (cat.name.toLowerCase().includes(search.toLowerCase())) {
              return cat;
            }
          })
          .map((cat: CatBreed) => (
            <div className="sm:text-lg md:text-lg text-xs" key={cat.id}>
              <h2 className="mb-4">{cat.name}</h2>
              <LazyLoad>
                <div
                  onClick={() => {
                    openModal(cat);
                  }}
                  className="bg-slate-900 border-2 rounded-lg cursor-crosshair hover:opacity-60 mx-auto"
                  style={{
                    backgroundImage: `url(${cat.images})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '300px',
                    height: '300px',
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
              <div className="flex">
                <div className="flex-col">
                  <div className="flex justify-center items-center mt-2">
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
                          {catBreed?.weight.metric}
                        </span>
                      </h2>
                      <Slider {...settings}>
                        {catBreed?.images.map((image: any) => {
                          return (
                            <div className="w-96 h-30">
                              <img
                                className="w-72 h-96 object-cover rounded-lg border mx-auto"
                                key={image.id}
                                src={image.url}
                              />
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                </div>
                <div className="w-9/12 ml-4">
                  <p className="mt-16">
                    {catBreed?.origin}&nbsp;&nbsp;
                    <ReactCountryFlag
                      countryCode={
                        catBreed?.country_code
                          ? catBreed.country_code
                          : 'Unknown'
                      }
                      svg
                    />
                    <a
                      className="text-sm text-white bg-gray-500 hover:text-slate-900 p-2 rounded-lg ml-8"
                      href={catBreed?.wikipedia_url}
                      target="_blank"
                    >
                      Wikipedia
                    </a>
                  </p>
                  <h1 className="text-sm mt-8 mb-3">
                    {catBreed?.temperament.map((temp: string) => (
                      <span className="text-xs bg-cyan-600 rounded-lg p-2 mb-3 mr-2">
                        {temp}
                      </span>
                    ))}
                    {catBreed?.hypoallergenic === 1 ? (
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
                        rating={catBreed?.adaptability}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Affection&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.affection_level}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Child Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.child_friendly}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
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
                  <div className="flex justify-center items-center text-center mt-6">
                    <h1 className="w-3/12 text-sm text-center mb-2">
                      Stranger Friendly&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.stranger_friendly}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Energy&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.energy_level}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Grooming&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.grooming}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
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
                  <div className="flex items-center justify-center text-center mt-6">
                    <h1 className="w-3/12 text-sm mb-2">
                      Intelligence&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.intelligence}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
                      Shedding&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.shedding_level}
                      />
                    </h1>
                    <h1 className="w-3/12 text-center text-sm mb-2">
                      Social Needs&nbsp;
                      <br />
                      <StarRatings
                        starRatedColor="aqua"
                        starDimension="15px"
                        starSpacing="2px"
                        rating={catBreed?.social_needs}
                      />
                    </h1>
                    <h1 className="w-3/12 text-sm mb-2">
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
              <br />
              <p className="mt-20">
                <span className="text-lg font-bold">Description:</span>{' '}
                {catBreed?.description}
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
