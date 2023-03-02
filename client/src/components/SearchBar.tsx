import { useState, useEffect } from 'react';
import CatBreeds from './CatBreeds';

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
          <CatBreeds {...breed} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
