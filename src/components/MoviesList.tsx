import { Movies } from '../types';
import Movie from './Movie';

interface Props {
  movies: Movies[];
  onSelectedId: (selectedId: string) => void
}

const MoviesList = ({ movies, onSelectedId }: Props) => {

  
  return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie key={movie.imdbID} movie={movie} onSelectedId={onSelectedId} />
      ))}
    </ul>
  );
};

export default MoviesList;
