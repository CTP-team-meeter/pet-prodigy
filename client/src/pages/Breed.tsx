import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Slider from 'react-slick';
import ReactCountryFlag from 'react-country-flag';

function Breed() {
  const { breedName } = useParams();

  const [breed, setBreed] = useState([]);
  const [breedImages, setBreedImages] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getBreed = async () => {
    const response = await fetch(
      'https://api.thecatapi.com/v1/breeds/search?q=' + breedName
    );

    const data = await response.json();
    setBreed(data);
  };

  const getBreedImages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/catBreeds`
    );
    const data = await response.json();
    console.log(data);

    data.forEach((breed: any) => {
      if (breed.name === breedName) {
        setBreedImages(breed.imageURLs);
        console.log(breed.imageURLs);
      }
    });
  };

  useEffect(() => {
    getBreed();
    getBreedImages();
  }, []);

  console.log(breedImages);

  return (
    <div className="flex justify-center">
      <div className="bg-primary text-primary w-7/12 p-2 border-2 mb-4 mr-3 rounded-lg">
        {breed.map((breed: any) => (
          <>
            <div className="grid grid-cols-2" key={breed.id}>
              <div>
                <div className="flex items-center justify-center">
                  <h1
                    style={{
                      fontSize: '2.5rem',
                      marginRight: '20px',
                    }}
                  >
                    {breed.name}
                  </h1>
                  <ReactCountryFlag countryCode={breed.country_code} svg />
                </div>

                <br />
                <Slider {...settings}>
                  {breedImages &&
                    breedImages.length > 0 &&
                    breedImages.map((image: any) => (
                      <img
                        className="h-96 cursor-crosshair hover:opacity-60 mx-auto mb-3 object-cover border-2 rounded-lg"
                        src={image.url}
                      />
                    ))}
                </Slider>
                <br />

                <h5 className="mt-8 ml-4 col-span-2 text-left">
                  {breed.description}
                </h5>
              </div>

              <div className="">
                <a
                  className="inline-block text-sm text-white bg-gray-500 hover:text-slate-900 p-2 rounded-lg ml-8 mt-2"
                  href={breed.wikipedia_url}
                  target="_blank"
                >
                  Wikipedia
                </a>
                <br />
                <div className="grid grid-cols-2 mt-20">
                  <div className="mb-3">
                    <p className="text-center">Adaptability</p>
                    <StarRatings
                      rating={breed.adaptability}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="text-center">Affection</p>

                    <StarRatings
                      rating={breed.affection_level}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="text-center">Child Friendly</p>
                    <StarRatings
                      rating={breed.child_friendly}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="text-center">Dog Friendly</p>
                    <StarRatings
                      rating={breed.dog_friendly}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="text-center">Energy Level</p>
                    <StarRatings
                      rating={breed.energy_level}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="text-center">Grooming</p>

                    <StarRatings
                      rating={breed.grooming}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="text-center">Health Issues</p>
                    <StarRatings
                      rating={breed.health_issues}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>
                  <div className="">
                    <p className="text-center">Intelligence</p>
                    <StarRatings
                      rating={breed.intelligence}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div>
                    <p className="text-center">Shedding Level</p>

                    <StarRatings
                      rating={breed.shedding_level}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>

                  <div>
                    <p className="text-center">Social Needs</p>

                    <StarRatings
                      rating={breed.social_needs}
                      starRatedColor="aqua"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Breed;
