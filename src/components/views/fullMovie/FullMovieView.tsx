import React, { useEffect, useState } from "react";
import * as API from "fetch/fetch";
import "./Styles.css";
import { Section } from "components/section/Section";
import { ActorCard } from "utils/cards";
import MovieDetails, { Actor } from "interfaces/MovieDetails";
import { GlobalStateContext } from "global/GlobalState";
import { Loader } from "utils/loader/Loader";
import { ErrorPage } from "components/views/error/ErrorPage";

const FullMovieView: React.FC = () => {
  const {
    currentMoviewInView,
    genres,
    isLoading,
    setIsLoading,
    error,
    setError,
    error_message,
    setErrorMessage,
  } = React.useContext(GlobalStateContext);

  const [data, set_data] = useState<MovieDetails>({
    cast: [],
    video_key: "",
  });

  const [movie_genres, set_movie_genres] = useState([]);

  const fetchData = async () => {
    try {
      const cast = await API.fetch_data<{ cast: Actor[] }>(
        `/movie/${currentMoviewInView.id}/credits`
      );

      const video_key_response = await API.fetch_data<{
        results: [{ key: any }];
      }>(`/movie/${currentMoviewInView.id}/videos`);

      set_data((prevState) => ({
        ...prevState,
        cast: cast.cast,
        video_key:
          video_key_response.results[video_key_response.results.length - 1]
            ?.key || "",
      }));

      setIsLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage("An error has occured. Try again.");
    }
  };

  const load_genres = () => {
    set_movie_genres(
      currentMoviewInView.genre_ids.map((id: number) => {
        return genres.genres.filter((e: any) => e.id === id)[0];
      })
    );
  };

  useEffect(() => {
    fetchData();
    load_genres();

    // Reset incase we got an error when the page was loading so that it wont cause issues
    // inside of other components.
    return () => {
      setError(false);
      setErrorMessage("");
    };
  }, [genres]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage error_message={error_message} />;
  }

  return (
    <div className="wrapper">
      <Section title="Genres">
        {movie_genres.map((e: any, key: number) => {
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
              id="player"
              itemType="text/html"
              width="100%"
              height="390"
              src={`https://www.youtube.com/embed/${data.video_key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}
            ></iframe>
          )}
        </div>
      </Section>
    </div>
  );
};

export default FullMovieView;
