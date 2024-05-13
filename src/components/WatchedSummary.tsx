import { WatchedMovieData } from '../types';
import { average } from '../utils/heplerFunctions';
interface Props {
    watched: WatchedMovieData[];
}

function WatchedSummary({ watched }: Props) {
    console.log('watched: ', watched);
    const avgImdbRating = average(
        watched.map(movie => parseInt(movie.imdbRating) || 0)
    );
    const avgUserRating = average(watched.map(movie => +movie.userRating));
    const avgRuntime = average(
        watched.map(movie => parseInt(movie.runtime) || 0)
    );

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{Number(avgImdbRating).toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{Number(avgUserRating).toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime}</span>
                </p>
            </div>
        </div>
    );
}

export default WatchedSummary;
