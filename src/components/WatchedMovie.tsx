import { WatchedMovieData } from '../types';

interface Props {
    movie: WatchedMovieData;
    onDeleteWatched: (id:string) => void;
}
const WatchedMovie = ({ movie, onDeleteWatched }: Props) => {

    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime}</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}>
                    ❌
                </button>
            </div>
        </li>
    );
};

export default WatchedMovie;
