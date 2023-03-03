import { useState, useEffect } from 'react';
import Button from './Button';
import BreedImages from './BreedImages';
import RandomBreedButton from './RandomBreedButton';

function SearchBar(props: any) {
  const [search, setSearch] = useState<string>('');
  const [filteredBreeds, setFilteredBreeds] = useState<any[]>([]);

  useEffect(() => {
    const filtered = props.breeds.filter((breed: any) =>
      breed.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBreeds(filtered);
  }, [props.breeds, search]);

  console.log(props);

  return (
    <div className="">
      <input
        className="w-8/12 p-2 border-2 mb-4 mr-3 rounded-lg"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <RandomBreedButton {...props} />

      {/* render the filteredBreeds array */}
      <div className=" bg-slate-900 p-4 border-2 rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 gap-4 text-center">
        {filteredBreeds.map((breed) => (
          <BreedImages {...breed} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
