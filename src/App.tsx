// import { Uploader } from 'uploader'; // Installed by "react-uploader".
// import { UploadButton } from 'react-uploader';
// import Main from './components/Main';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NumResults from './components/NumResults';
import Main from './components/Main';
import Box from './components/Box';
import MoviesList from './components/MoviesList';
import WatchedList from './components/WatchedList';
import WatchedSummary from './components/WatchedSummary';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import { OMDB_API_KEY } from './utils/apiKeys';
import { WatchedMovieData } from './types';

function App() {
    const [query, setQuery] = useState('interstellar');
    const [movies, setMovies] = useState([]);
    /*
        The initial state is set using a function. This function will be executed only once, during the initial render. It's commonly used when the initial state depends on some complex computation or when you want to ensure that the computation of the initial state is lazy (i.e., not computed on every render).
    */
    const [watched, setWatched] = useState<WatchedMovieData[]>(() => {
        const storedWatched = JSON.parse(
            localStorage.getItem('watched') || '[]'
        );
        return storedWatched;
    });
    /*
        The initial state is set directly by executing JSON.parse(localStorage.getItem('watched') || ''). This means that every time the component re-renders, this expression will be executed. It's a more straightforward approach but might have performance implications if JSON.parse(localStorage.getItem('watched') || '') is a costly operation.
    */
    // const [watched, setWatched] = useState<WatchedMovieData[]>(JSON.parse(localStorage.getItem('watched') || ''));
    const [isLoading, setIsLoading] = useState(false);
    // console.log('isLoading: ', isLoading);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState('');

    function handleSelectedId(id: string) {
        setSelectedId(prev => (prev === id ? '' : id));
    }

    function handleCloseMovie() {
        setSelectedId('');
    }

    function handleAddWatched(movie: WatchedMovieData): number {
        const isAleardyWached = watched.some(
            item => item.imdbID === movie.imdbID
        );
        if (isAleardyWached) {
            alert('This movie is Already Selected!');
            return -1;
        } else {
            setWatched(prev => [...prev, movie]);
            return 1;
        }
    }

    function handleDeleteWatched(id: string) {
        const filteredWatchedMovies = watched.filter(
            movie => movie.imdbID !== id
        );
        setWatched(filteredWatchedMovies);
    }

    useEffect(() => {
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
            handleCloseMovie();
            fetchMovies();
        }, 1000);

        return () => {
            clearTimeout(searchTimer);
        };
    }, [query]);

    useEffect(() => {
        if (watched.length)
            localStorage.setItem('watched', JSON.stringify(watched));
    }, [watched]);

    // useEffect(() => {
    //     const getwatched = JSON.parse(localStorage.getItem('watched') || '');
    //     if (getwatched) {
    //         setWatched(getwatched);
    //     }
    // }, []);

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResults moviesLength={movies?.length} />
            </Navbar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage msg={error} />}
                    {!isLoading && !error && (
                        <MoviesList
                            movies={movies}
                            onSelectedId={handleSelectedId}
                        />
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

export default App;
// Initialize once (at the start of your app).
// const uploader = Uploader({
//   apiKey: 'free', // Get production API keys from Upload.io
// });

// Configuration options: https://upload.io/uploader#customize
// const options = { multi: true };

// const App = () => (
//   <UploadButton
//     uploader={uploader}
//     options={options}
//     onComplete={files => alert(files.map(x => x.fileUrl).join('\n'))}
//   >
//     {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
//   </UploadButton>
// );

// const tempMovieData = [
//     {
//         imdbID: 'tt1375666',
//         Title: 'Inception',
//         Year: '2010',
//         Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     },
//     {
//         imdbID: 'tt0133093',
//         Title: 'The Matrix',
//         Year: '1999',
//         Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
//     },
//     {
//         imdbID: 'tt6751668',
//         Title: 'Parasite',
//         Year: '2019',
//         Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
//     },
// ];

// const tempWatchedData = [
//     {
//         imdbID: 'tt1375666',
//         Title: 'Inception',
//         Year: '2010',
//         Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//         runtime: 148,
//         imdbRating: 8.8,
//         userRating: 10,
//     },
//     {
//         imdbID: 'tt0088763',
//         Title: 'Back to the Future',
//         Year: '1985',
//         Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//         runtime: 116,
//         imdbRating: 8.5,
//         userRating: 9,
//     },
// ];
