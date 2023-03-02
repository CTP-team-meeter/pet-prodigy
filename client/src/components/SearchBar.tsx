import { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';

function SearchBar(props: any) {
  const [search, setSearch] = useState<string>('');
  const [filteredBreeds, setFilteredBreeds] = useState<any[]>([]);

  useEffect(() => {
    const filtered = props.breeds.filter((breed: any) =>
      breed.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBreeds(filtered);
  }, [props.breeds, search]);

  console.log(filteredBreeds);
  return (
    <div className="">
      <input
        className="w-8/12 p-2 border-2 mb-4 rounded-lg"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="bg-slate-900 p-3 border-2 rounded-lg ml-4 mb-4 text-white">
        Random cat
      </button>
      {/* render the filteredBreeds array */}
      <div className=" bg-slate-900 p-4 border-2 rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 gap-4 text-center">
        {filteredBreeds.map((breed) => (
          <LazyLoad>
            <div className="w-96 px-10" key={breed._id}>
              <h2 className="mb-4 text-lg">{breed.name}</h2>

              <img
                className="w-full h-80 bg-slate-900 border-2 rounded-lg cursor-crosshair hover:opacity-60 mx-auto mb-10 object-cover"
                src={breed?.imageURLs[0]?.url}
                alt={breed.name}
              />
              <img
                width={30}
                className="mx-auto mt-4 mb-4"
                src="/paw.png"
                alt="paw"
              />
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
