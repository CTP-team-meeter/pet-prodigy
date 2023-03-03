import { useState } from 'react';
import Button from './Button';
import ModalDisplay, { openModal } from './ModalDisplay';

function RandomBreedButton(props: any) {
  const [breed, setBreed] = useState({});

  function getRandomBreed() {
    const randomCat =
      props.breeds[Math.floor(Math.random() * props.breeds.length)];
    setBreed(randomCat);
  }

  return (
    <>
      <Button title="Random Cat" onclick={getRandomBreed} />
    </>
  );
}

export default RandomBreedButton;
