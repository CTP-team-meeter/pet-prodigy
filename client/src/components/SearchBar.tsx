import { useState, useEffect } from 'react';
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

  return (
    <div>
      <input
        className="w-8/12 p-2 border-2 mb-4 mr-3 rounded-lg"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* render the RandomBreedButton component */}
      <RandomBreedButton {...props} />
      {/* render the filteredBreeds array */}
      <div
        style={{ backgroundColor: '#463366' }}
        className="p-4 border-2 rounded-lg grid xl:grid-cols-4 lg:grid-cols-3 gap-4 text-center"
      >
        {filteredBreeds.map((breed) => (
          <BreedImages {...breed} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
