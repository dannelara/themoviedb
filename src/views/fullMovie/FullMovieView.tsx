import React, { useEffect, useState } from "react";
import * as API from "fetch/fetch";
import "./Styles.css";
import { GlobalStateContext } from "global/GlobalState";
import { ErrorPage } from "views";
import { Section, ActorCard, Loader } from "components";
import MovieDetails, { Actor } from "interfaces/MovieDetails";

const FullMovieView: React.FC = () => {
  const {
    currentMoviewInView,
    genres,
    isLoading,
    setIsLoading,
    error,
    setError,
    errorMessage,
    setErrorMessage,
  } = React.useContext(GlobalStateContext);

  const [data, setData] = useState<MovieDetails>({
    cast: [],
    video_key: "",
  });

  const [movieGenres, setMovieGenres] = useState([]);

  const fetchData = async () => {
    try {
      const cast = await API.fetch_data<{ cast: Actor[] }>(
        `/movie/${currentMoviewInView.id}/credits`
      );

      const videoKeyResponse = await API.fetch_data<{
        results: [{ key: any }];
      }>(`/movie/${currentMoviewInView.id}/videos`);

      setData((prevState) => ({
        ...prevState,
        cast: cast.cast,
        video_key:
          videoKeyResponse.results[videoKeyResponse.results.length - 1]?.key ||
          "",
      }));

      setIsLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage("An error has occured. Try again.");
    }
  };

  const loadGenres = () => {
    setMovieGenres(
      currentMoviewInView.genre_ids.map((id: number) => {
        return genres.genres.filter((e: any) => e.id === id)[0];
      })
    );
  };

  useEffect(() => {
    fetchData();
    loadGenres();

    return () => {
      setError(false);
      setErrorMessage("");
    };
  }, [genres]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage error_message={errorMessage} />;
  }

  return (
    <div className="wrapper">
      <Section title="Genres">
        {movieGenres.map((e: any, key: number) => {
          return (
            <p className="text_xsmall text_big default_color " key={key}>
              {e.name}
            </p>
          );
        })}
      </Section>

      <Section title="Overview">
        <div className="flex_center">
          <span>{currentMoviewInView.overview}</span>
        </div>
      </Section>
      <Section title="Actors">
        <div className="flex_container_scroll">
          {data.cast.slice(0, 6).map((actor, key: number) => {
            return <ActorCard data={actor} key={key} />;
          })}
        </div>
      </Section>

      <Section title="">
        <div className="movie_player_container">
          {data.video_key && (
            <iframe
              title="Trailer player"
              id="player"
              itemType="text/html"
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${data.video_key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}
            ></iframe>
          )}
        </div>
      </Section>
    </div>
  );
};

export default FullMovieView;
