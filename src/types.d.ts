export type Movies = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export interface WatchedMovieData {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: string;
  imdbRating: string;
  userRating: number;
  countRatingDecisions: number;
}
