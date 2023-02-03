import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ReactCountryFlag from 'react-country-flag';
import StarRatings from 'react-star-ratings';
interface Cat {
  id: number;
  name: string;
  origin: string;
  temperament: string;
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
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  country_code: string;
  indoor: number;
  lap: number;
  url: string;
}

const Home = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catBreeds = await fetch('https://api.thecatapi.com/v1/breeds');
        const data = await catBreeds.json();
        const promises = data.map(async (breed: any) => {
          const resultImage = await fetch(
            'https://api.thecatapi.com/v1/images/search?breed_ids=' + breed.id
          );
          const dataImage = await resultImage.json();

          if (dataImage[0]) {
            return {
              id: breed.id,
              name: breed.name || 'Missing data',
              url: dataImage[0].url || 'Missing data',
              origin: breed.origin || 'Missing data',
              temperament: breed.temperament || 'Missing data',
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
              cfa_url: breed.cfa_url || 'Missing data',
              vetstreet_url: breed.vetstreet_url || 'Missing data',
              vcahospitals_url: breed.vcahospitals_url || 'Missing data',
              country_code: breed.country_code || 'Missing data',
              indoor: breed.indoor || 0,
              lap: breed.lap || 0,
            };
          }
        });

        const cats = await Promise.all(promises);
        setCats(cats.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

                  <div
                    style={{
                      backgroundImage: `url(${cat.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      height: '600px',
                    }}
                    className="border-2 rounded-lg"
                  ></div>
                </div>
                <div className="text-left  ml-3 mt-12">
                  <p className="text-xl font-bold mb-3">
                    {cat.origin} &nbsp;&nbsp;
                    <ReactCountryFlag
                      countryCode={cat.country_code.toLocaleLowerCase()}
                      svg
                    />
                  </p>
                  <p className="mb-3">
                    Adaptability: &nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.adaptability}
                    />
                  </p>
                  <p className="mb-3">
                    Affection:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.affection_level}
                    />
                  </p>
                  <p className="mb-3">
                    Child Friendly:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.child_friendly}
                    />
                  </p>
                  <p className="mb-3">
                    Dog Friendly:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.dog_friendly}
                    />
                  </p>
                  <p className="mb-3">
                    Stranger Friendly:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.stranger_friendly}
                    />
                  </p>
                  <p className="mb-3">
                    Energy:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.energy_level}
                    />
                  </p>
                  <p className="mb-3">
                    Grooming:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.grooming}
                    />
                  </p>
                  <p className="mb-3">
                    Health Issues:&nbsp;{' '}
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.health_issues}
                    />
                  </p>
                  <p className="mb-3">
                    Intelligence:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.intelligence}
                    />
                  </p>
                  <p className="mb-3">
                    Shedding:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.shedding_level}
                    />
                  </p>
                  <p className="mb-3">
                    Social Needs:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.social_needs}
                    />
                  </p>
                  <p className="mb-3">
                    Indoor:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.indoor}
                    />
                  </p>
                  <p className="mb-3">
                    Lap:&nbsp;
                    <StarRatings
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                      rating={cat.lap}
                    />
                  </p>
                  <p className="mb-3">
                    Weight (Imperial):&nbsp;
                    {cat.weight.imperial}
                  </p>
                  <p className="mb-3">
                    Weight (Metric):&nbsp;
                    {cat.weight.metric}
                  </p>
                </div>
                <p className="w-full text-center mt-8">
                  <span className="font-bold">Temperament:</span>
                  &nbsp;
                  {cat.temperament}
                </p>
                <p className="mt-8">
                  <span className="text-lg font-bold">Description</span>
                  :&nbsp;
                  {cat.description}
                </p>
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
