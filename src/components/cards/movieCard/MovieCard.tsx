import React, { useState } from "react";
import "./Styles.css";
import { Movie } from "interfaces/Movie";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "global/GlobalState";

interface MovieCardProps {
  big?: boolean;
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ big, movie }) => {
  const { saveToLocalStorage } = React.useContext(GlobalStateContext);

  const setCurrentMovieInView = () => {
    saveToLocalStorage(movie);
  };

  return (
    <div className={big ? "card_big" : "card_small"} id={`${movie.id}`}>
      <Link
        to={`/movie?id=${movie.id}&name=${movie.title}`}
        onClick={setCurrentMovieInView}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="cover_image"
          alt="poster"
        />
        {big && (
          <div className="card_description">
            <div>
              <span className="text_small">{movie.title}</span>
              <span className="text_xsmall">{movie.release_date}</span>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};
