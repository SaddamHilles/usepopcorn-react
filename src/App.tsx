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

const tempMovieData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt0133093',
        Title: 'The Matrix',
        Year: '1999',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt6751668',
        Title: 'Parasite',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
];

interface WatchedData {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
}

const tempWatchedData: WatchedData[] = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: 'tt0088763',
        Title: 'Back to the Future',
        Year: '1985',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];


function App() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState('');

    function handleSelectedId(id: string){
        setSelectedId(prev => prev === id ? '' : id)
    }

    function handleCloseMovie(){
        setSelectedId('')
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

        // if(query.length < 3){
        //   setError(null);
        //   setMovies([])
        //   return;
        // }
        fetchMovies();
    }, [query]);
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
                        <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList watched={watched} />
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
