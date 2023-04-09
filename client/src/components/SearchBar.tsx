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

  const handleFilter = (e: any) => {
    if (e.target.value === 'Name') {
      const filtered = props.breeds.filter((breed: any) =>
        breed.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBreeds(filtered);
    } else if (e.target.value === 'Dog') {
      const filtered = props.breeds.filter((breed: any) =>
        breed.animal_type.toLowerCase().includes('dog')
      );
      setFilteredBreeds(filtered);
    } else if (e.target.value === 'Cat') {
      const filtered = props.breeds.filter((breed: any) =>
        breed.animal_type.toLowerCase().includes('cat')
      );
      setFilteredBreeds(filtered);
    }
  };

  return (
    <div>
      <input
        className="bg-primary text-primary w-7/12 p-2 border-2 mb-4 mr-3 rounded-lg"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="bg-primary text-primary p-2 border-2 mb-4 rounded-lg mr-3"
        onChange={handleFilter}
      >
        <option value="Name">Name</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      {/* render the RandomBreedButton component */}
      <RandomBreedButton {...props} />
      {/* render the filteredBreeds array */}
      <div className="p-4 w-10/12 mx-auto grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justfify-center text-center">
        {filteredBreeds.map((breed, index) => (
          <BreedImages key={index} {...breed} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
