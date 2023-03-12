import { useState } from 'react';
import LazyLoad from 'react-lazy-load';
import ModalDisplay from './ModalDisplay';

function BreedImages(props: any) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  return (
    <div>
      <LazyLoad>
        <div className="w-96 px-10" key={props._id}>
          <div className="border-2 border-gray-400 rounded-lg transform hover:-translate-y-2 transition duration-300 ease-in-out bg-primary bg-secondary w-96 h-80 flex flex-col items-center">
            <img
              onClick={openModal}
              className="w-full h-64 cursor-crosshair hover:opacity-60 mx-auto mb-3 object-cover"
              src={props?.imageURLs[0]?.url}
              alt={props.name}
            />
            <h2 className="text-primary mb-4 text-xl">{props.name}</h2>
          </div>
        </div>
      </LazyLoad>
      {showModal && <ModalDisplay {...props} setShowModal={setShowModal} />}
    </div>
  );
}

export default BreedImages;
