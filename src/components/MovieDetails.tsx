import { useEffect, useState } from 'react';
import { OMDB_API_KEY } from '../utils/apiKeys';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import StarRating from './starRating/StarRating';
import Loader from './Loader';
import { WatchedMovieData } from '../types';

interface Props {
    selectedId: string;
    watched: WatchedMovieData[];
    onCloseMovie: () => void;
    onAddWatched: (movie: WatchedMovieData) => number;
}

interface MovieData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

const MovieDetails = ({
    selectedId,
    onCloseMovie,
    onAddWatched,
    watched,
}: Props) => {
    const [movie, setMovie] = useState<MovieData>();
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    function handleAdd() {
        const newWatchedMovie: WatchedMovieData = {
            imdbID: movie?.imdbID || '',
            imdbRating: movie?.imdbRating.split(' ')[0] || '',
            Poster: movie?.Poster || '',
            runtime: movie?.Runtime || '',
            Title: movie?.Title || '',
            userRating: userRating,
            Year: movie?.Year || '',
        };
        const op = onAddWatched(newWatchedMovie);
        if (op === -1) {
            return;
        } else {
            onCloseMovie();
        }
    }

    function handleUserRating(rating: number) {
        setUserRating(rating);
    }

    const isWatched = watched.find(movie => movie.imdbID === selectedId);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get<MovieData>(
                    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`
                );
                // const movieDetails = await result.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [selectedId]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={movie?.Poster} alt={movie?.Title} />

                        <div className="details-overview">
                            <h2>{movie?.Title}</h2>
                            <p>
                                {movie?.Released} &bull; ${movie?.Runtime}
                            </p>
                            <p>
                                {/* <span>⭐</span> */}
                                <Rating
                                    readonly
                                    initialValue={
                                        (movie?.imdbRating &&
                                            Math.round(
                                                +movie?.imdbRating / 2
                                            )) ||
                                        0
                                    }
                                    size={20}
                                />
                                {movie?.imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>
                    <section>
                        {!isWatched ? (
                            <div className="rating">
                                <StarRating
                                    size={24}
                                    starsCount={10}
                                    onUserRating={handleUserRating}
                                    userRating={userRating}
                                />
                                <button
                                    className="btn-add"
                                    onClick={handleAdd}
                                    disabled={!userRating}
                                    style={{
                                        cursor: userRating
                                            ? 'pointer'
                                            : 'default',
                                        backgroundColor: !userRating
                                            ? 'gray'
                                            : '',
                                    }}>
                                    + Addto list
                                </button>
                            </div>
                        ) : (
                            <p
                                style={{
                                    margin: 'auto',
                                    color: 'green',
                                    fontWeight: 'bold',
                                    backgroundColor: 'whitesmoke',
                                    borderRadius: '8px',
                                    padding: '1rem 2rem'
                                }}>
                                You rated this movie{' '}
                                <span
                                    style={{
                                        color: 'gold',
                                        marginLeft: '0.6rem',
                                    }}>
                                    {isWatched.userRating} ⭐
                                </span>
                            </p>
                        )}
                        <p>
                            <em>{movie?.Plot}</em>
                        </p>
                        <p>Starring {movie?.Actors}</p>
                        <p>Directed by {movie?.Director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
