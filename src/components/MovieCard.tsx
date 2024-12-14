import React from "react";
import { Movie } from "../types";
// import "./MovieCard.css";

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movie: Movie) => void;
  isInWatchlist: boolean;
  onRemoveFromWatchlist: (imdbID: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddToWatchlist,
  isInWatchlist,
  onRemoveFromWatchlist,
}) => {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
        <p>Rating: ⭐ {movie.imdbRating || "N/A"}</p>
        {isInWatchlist ? (
          <button
            className="action-button"
            onClick={() => onRemoveFromWatchlist(movie.imdbID)}
          >
            Remove from Watchlist
          </button>
        ) : (
          <button
            className="action-button"
            onClick={() => onAddToWatchlist(movie)}
          >
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
