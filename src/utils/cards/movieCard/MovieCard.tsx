import React, { useState } from "react";
import "./Styles.css";
import { Movie } from "interfaces/Movie";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "global/GlobalState";
import no_image_found from "assets/images/no_image_found.png";

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
        className="cover_link"
        onClick={setCurrentMovieInView}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : no_image_found
          }
          className="cover_image"
          alt="poster"
        />

        <div
          className={`flex_center card_description${big ? "" : "_" + "big"}`}
        >
          <div className="info_container">
            <span className="text_small">{movie.title}</span>
            <span className="text_xsmall">{`${new Date(
              `${movie.release_date}`
            ).getFullYear()}`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
