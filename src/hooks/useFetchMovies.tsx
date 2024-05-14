import { useEffect, useState } from 'react';
import { OMDB_API_KEY } from '../utils/apiKeys';

interface Props {
    query: string;
    callback?: () => void;
}
const useFetchMovies = ({ query, callback }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        callback?.();
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const result = await fetch(
                    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${
                        query || 'interstellar'
                    }`
                );
                if (!result.ok) {
                    throw new Error('Failed to fetch movies!');
                }
                const data = await result.json();
                if (data.Response === 'False') {
                    throw new Error('Movie Not fount!');
                }
                setMovies(data.Search);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        if (query.length < 3) {
            setError(null);
            setMovies([]);
            return;
        }
        const searchTimer = setTimeout(() => {
            fetchMovies();
        }, 1000);

        return () => {
            clearTimeout(searchTimer);
        };
    }, [query, callback]);

    return { movies, isLoading, error };
};

export default useFetchMovies;
