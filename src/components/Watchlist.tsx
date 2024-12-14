import React from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";
// import "./Watchlist.css";

interface WatchlistProps {
  watchlist: Movie[];
  onRemoveFromWatchlist: (imdbID: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, onRemoveFromWatchlist }) => {
  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>
      {watchlist.length > 0 ? (
        watchlist.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddToWatchlist={() => {}}
            isInWatchlist={true}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
          />
        ))
      ) : (
        <p>Your watchlist is empty!</p>
      )}
    </div>
  );
};

export default Watchlist;
