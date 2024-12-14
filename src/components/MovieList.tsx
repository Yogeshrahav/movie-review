import React from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";
// import "./MovieList.css";

interface MovieListProps {
  movies: Movie[];
  onAddToWatchlist: (movie: Movie) => void;
  watchlist: Movie[];
  onRemoveFromWatchlist: (imdbID: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onAddToWatchlist,
  watchlist,
  onRemoveFromWatchlist,
}) => {
  const isInWatchlist = (id: string) =>
    watchlist.some((movie) => movie.imdbID === id);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={isInWatchlist(movie.imdbID)}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
        />
      ))}
    </div>
  );
};

export default MovieList;
