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
        <div key={props._id} className="w-fit mx-auto">
          <div className="border-2 w-fit rounded-lg transform hover:-translate-y-2 transition duration-300 ease-in-out bg-primary bg-secondary h-80 flex flex-col items-center">
            <img
              onClick={openModal}
              className="w-96 h-64 cursor-crosshair hover:opacity-60 mx-auto mb-3 object-cover"
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
