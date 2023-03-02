import { useCallback, useState } from 'react';
import { CatBreed } from '../types/cat';
import LazyLoad from 'react-lazy-load';

function CatBreeds(props: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {props.breeds.map((breed: any) =>
        props.breeds.map((cat: CatBreed) => (
          <div className="text-lg" key={props.breeds._id}>
            <h2 className="mb-4">{props.name}</h2>
            <LazyLoad>
              <img
                width={30}
                onClick={() => {
                  openModal(props.breeds);
                }}
                src={props.breeds.imageURLs[0]?.url}
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
        ))
      )}
    </div>
  );
}

export default CatBreeds;
