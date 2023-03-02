import { useCallback, useState } from 'react';
import { CatBreed } from '../types/cat';
import LazyLoad from 'react-lazy-load';

function CatBreeds(props: any) {
  return (
    <LazyLoad>
      <div className="w-96 px-10" key={props._id}>
        <h2 className="mb-4 text-lg">{props.name}</h2>

        <img
          className="w-full h-80 bg-slate-900 border-2 rounded-lg cursor-crosshair hover:opacity-60 mx-auto mb-10 object-cover"
          src={props?.imageURLs[0]?.url}
          alt={props.name}
        />
        <img
          width={30}
          className="mx-auto mt-4 mb-4"
          src="/paw.png"
          alt="paw"
        />
      </div>
    </LazyLoad>
  );
}

export default CatBreeds;
