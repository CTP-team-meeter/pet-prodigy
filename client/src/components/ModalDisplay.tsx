import { useState } from 'react';
import Modal from 'react-modal';
import CarouselSlider from './CarouselSlider';
import LazyLoad from 'react-lazy-load';

// Set Modal to root
Modal.setAppElement('#root');

function ModalDisplay(props: any) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (    
    <Modal
    isOpen={modalIsOpen}
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
              <CarouselSlider breeds={catBreed} />
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

);



export default ModalDisplay;
