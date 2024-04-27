import { Movies } from '../types';

interface Props {
  movies: Movies[];
  setSelectedId: (selectedId: string) => void
}

const MoviesList = ({ movies, setSelectedId }: Props) => {
  return (
    <ul className='list'>
      {movies?.map(movie => (
        <li key={movie.imdbID} style={{cursor: 'pointer'}} onClick={() => setSelectedId(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
