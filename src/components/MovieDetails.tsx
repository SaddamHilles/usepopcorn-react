import { useEffect } from "react";
import { OMDB_API_KEY } from "../utils/apiKeys";

interface Props {
    selectedId: string;
}
const MovieDetails = ({ selectedId }: Props) => {
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const result = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`)
      const details = await result.json()
      console.log('details: ', details);
    }
    fetchMovieDetails()
  }, [selectedId])
    return <div className="details">{selectedId}</div>;
};

export default MovieDetails;
