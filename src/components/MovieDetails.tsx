import { useEffect, useState } from 'react';
import { OMDB_API_KEY } from '../utils/apiKeys';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import StarRating from './starRating/StarRating';
import Loader from './Loader';

interface Props {
    selectedId: string;
    onCloseMovie: () => void;
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

const MovieDetails = ({ selectedId, onCloseMovie }: Props) => {
    const [movie, setMovie] = useState<MovieData>();
    const [isLoading, setIsLoading] = useState(false);
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
                        <div className="rating">
                            <StarRating size={24} starsCount={10} />
                        </div>
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
