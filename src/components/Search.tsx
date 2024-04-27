import { useState } from 'react';

interface Props {
  query: string;
  setQuery: (movieName: string) => void
}
function Search({query, setQuery}: Props) {

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}

export default Search;
