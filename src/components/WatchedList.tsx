import { WatchedMovieData } from '../types';
import WatchedMovie from './WatchedMovie';

interface Props {
  watched: WatchedMovieData[];
  onDeleteWatched: (id: string) => void;
}

const WatchedList = ({ watched, onDeleteWatched }: Props) => {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
};

export default WatchedList;
