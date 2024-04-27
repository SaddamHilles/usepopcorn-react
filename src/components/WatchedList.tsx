import WatchedMovie from './WatchedMovie';
import { Watched } from '../types';

interface Props {
  watched: Watched[];
}

const WatchedList = ({ watched }: Props) => {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedList;
