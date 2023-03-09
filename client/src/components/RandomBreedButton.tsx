import { useState } from 'react';
import Button from './Button';
import ModalDisplay from './ModalDisplay';

function RandomBreedButton(props: any) {
  const [breed, setBreed] = useState({});
  const [showModal, setShowModal] = useState(false);

  function getRandomBreed() {
    setShowModal(true);
    const randomCat =
      props.breeds[Math.floor(Math.random() * props.breeds.length)];
    setBreed(randomCat);
  }

  return (
    <>
      <Button title="Random Cat" onclick={getRandomBreed} />
      {showModal && <ModalDisplay {...breed} setShowModal={setShowModal} />}
    </>
  );
}

export default RandomBreedButton;
