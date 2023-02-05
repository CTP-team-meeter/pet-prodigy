import { useState, useEffect, useCallback } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ReactCountryFlag from 'react-country-flag';
import Slider from 'react-slick';
import LazyLoad from 'react-lazy-load';
import StarRatings from 'react-star-ratings';

interface Cat {
  id: number;
  name: string;
  images: Array<any>;
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

const Home = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const catBreeds = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await catBreeds.json();
      const promises = data.map(async (breed: any) => {
        const resultImage = await fetch(
          'https://api.thecatapi.com/v1/images/search?breed_ids=' +
            breed.id +
            '&limit=5'
        );
        const dataImage = await resultImage.json();
        const temperament = breed.temperament?.split(', ');

        if (dataImage) {
          return {
            id: breed.id,
            name: breed.name || 'Missing data',
            images: dataImage || 'Missing data',
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

  useEffect(() => {
    fetchData();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (error) {
    return (
      <>
        <p className="text-red-500">Something went Wrong!</p>
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <TailSpin
          width={40}
          height={40}
          color="#00FFFF"
          ariaLabel="tail-spin-loading"
        />
      ) : (
        <div className="w-full bg-slate-900 border-2 rounded-lg p-10">
          {cats.map((cat: Cat) => (
            <>
              <div
                className="flex flex-wrap justify-start text-justify mb-10 items-start"
                key={cat.id}
              >
                <div className="" style={{ width: '40%' }}>
                  <h1 className="text-center font-bold md:text-4xl sm:text-2xl text-lg mb-3">
                    {cat.name}
                  </h1>
                  {cats.map((cat: Cat) => (
                    <div
                      key={cat.id}
                      className="bg-slate-900 grid grid-cols-3 gap-4"
                    >
                      <Slider {...carouselSettings}>
                        {cat.images.map((image, index) => (
                          <LazyLoad key={index} height={300}>
                            <div
                              key={index}
                              style={{
                                backgroundImage: `url(${image.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: '300px',
                              }}
                              className="border-2 rounded-lg"
                            ></div>
                          </LazyLoad>
                        ))}
                      </Slider>
                    </div>
                  ))}
                </div>
                <div className="text-left  ml-3 mt-12">
                  <p className="text-xl font-bold mb-3">
                    {cat.origin} &nbsp;
                    <ReactCountryFlag countryCode={cat.country_code} svg />
                    <a
                      className="text-sm text-white bg-gray-400 hover:text-slate-900 p-2 rounded-lg ml-8"
                      href={cat.wikipedia_url}
                      target="_blank"
                    >
                      Wikipedia
                    </a>
                  </p>
                  <h1 className="text-sm mt-8 mb-3">
                    {cat.temperament.map((temp: string) => (
                      <span className="text-xs bg-cyan-500 rounded-lg p-2 mb-3 mr-2">
                        {temp}
                      </span>
                    ))}
                    {cat.hypoallergenic === 1 ? (
                      <span className="text-xs bg-yellow-500 rounded-lg p-2 mb-3 ">
                        Hypoallergenic
                      </span>
                    ) : null}
                  </h1>
                  <h1 className="text-sm mt-6 mb-3">
                    Adaptability: &nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.adaptability}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Affection:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.affection_level}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Child Friendly:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.child_friendly}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Dog Friendly:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.dog_friendly}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Stranger Friendly:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.stranger_friendly}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Energy:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.energy_level}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Grooming:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.grooming}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Health Issues:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.health_issues}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Intelligence:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.intelligence}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Shedding:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.shedding_level}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Social Needs:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.social_needs}
                    />
                  </h1>
                  <h1 className="text-sm mb-3">
                    Life Span:&nbsp;
                    {cat.life_span}
                  </h1>
                  <h1 className="text-sm mb-3">
                    Weight (Imperial):&nbsp;
                    {cat.weight.imperial}
                  </h1>
                  <h1 className="text-sm mb-3">
                    Weight (Metric):&nbsp;
                    {cat.weight.metric}
                  </h1>
                </div>
                <h1 className="text-sm mt-8">
                  <span className="text-lg font-bold">Description</span>
                  :&nbsp;
                  {cat.description}
                </h1>
              </div>
              <hr className="border-1 m-20" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
