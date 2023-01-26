import React, { useEffect, useState } from "react";
import "./Styles.css";
import { Loader } from "utils/loader/Loader";
import { GlobalStateContext } from "global/GlobalState";
import { Section } from "components/section/Section";
import { ActionSpan } from "utils/actionSpan/ActionSpan";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";
import { MovieCard } from "utils/cards";
import { ErrorPage } from "components/views/error/ErrorPage";
import setActiveGenreElementStyle from "utils/dom/setActiveElementStyle";

export const Discover: React.FC = ({}) => {
  const {
    genres,
    isLoading,
    setIsLoading,
    error,
    setError,
    errorMessage,
    setErrorMessage,
  } = React.useContext(GlobalStateContext);

  // State to track the current active genre. This will help to remove active attribute from when we change to a new genre.
  const [currentActiveGenre, setCurrentActiveGenre] = useState<number>(0);

  const [data, set_data] = useState<Movies>({ results: [] });

  const fetch_movie_with_genre = async (
    event?: React.MouseEvent<HTMLElement>
  ) => {
    try {
      event &&
        (async () => {
          setActiveGenreElementStyle(
            parseInt(event.currentTarget.id),
            setCurrentActiveGenre,
            currentActiveGenre
          );

          const url = "/discover/movie";
          const query = `&with_genres=${event.currentTarget.id}`;

          const data = await API.fetch_data<Movies>(url, query);

          set_data((prevState) => ({
            ...prevState,
            results: data.results,
          }));
        })();

      setIsLoading(false);
    } catch (error: any) {
      setError(true);
      setErrorMessage("An error has occured. Try again.");
    }
  };

  useEffect(() => {
    fetch_movie_with_genre();

    return () => {
      setError(false);
      setErrorMessage("");
    };
  }, [genres]);

  if (error) {
    return <ErrorPage error_message={errorMessage} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="content_wrapper flex_center">
      <Section title="Discover" wrap>
        {genres.genres.slice(0, 8).map((genre: any, key: number) => {
          return (
            <ActionSpan
              text={genre.name}
              key={key}
              id={genre.id.toString()}
              onClick={fetch_movie_with_genre}
            />
          );
        })}
      </Section>
      <Section title="">
        {data.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};
