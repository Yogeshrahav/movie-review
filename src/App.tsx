import React, { useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import Watchlist from "./components/Watchlist";
import { Movie } from "./types";
import "./styles/App.css";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=7a033387`
      );
      const movieData = response.data.Search || [];
      const detailedMovies = await Promise.all(
        movieData.map(async (movie: { imdbID: string }) => {
          const detailsResponse = await axios.get(
            `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=7a033387`
          );
          return detailsResponse.data;
        })
      );
      setMovies(detailedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addToWatchlist = (movie: Movie) => {
    if (!watchlist.some((item) => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID: string) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Library</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={fetchMovies}>
            Search
          </button>
        </div>
      </header>
      <main>
        <MovieList
          movies={movies}
          onAddToWatchlist={addToWatchlist}
          watchlist={watchlist}
          onRemoveFromWatchlist={removeFromWatchlist}
        />
        <Watchlist
          watchlist={watchlist}
          onRemoveFromWatchlist={removeFromWatchlist}
        />
      </main>
    </div>
  );
};

export default App;
