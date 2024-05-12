import { Movies } from '../types';

interface Props {
    movie: Movies;
    onSelectedId: (selectedId: string) => void;
}
const Movie = ({ movie, onSelectedId }: Props) => {
    return (
        <li
            key={movie.imdbID}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectedId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
};

export default Movie;
