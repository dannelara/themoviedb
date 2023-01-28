import React, { useState, useEffect } from "react";
import "./Styles.css";
import * as API from "fetch/fetch";
import { GlobalStateContext } from "global/GlobalState";
import Movies from "interfaces/Movie";
import { ErrorPage } from "views";
import {
  Section,
  Loader,
  ActionSpan,
  Closeable,
  MovieCard,
  RangeSlider,
} from "components";
import { setActiveGenreElementStyle, useDebounceValue } from "utils";

export const Discover: React.FC = ({}) => {
  const {
    genres,
    isLoading,
    setIsLoading,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    rangeval,
  } = React.useContext(GlobalStateContext);

  // State to track the current active genre. This will help to remove active attribute from when we change to a new genre.
  const [currentActiveGenre, setCurrentActiveGenre] = useState<number>(0);
  // The debounced range value I will use to filter movies by score.
  const debounceRangeValue = useDebounceValue(rangeval, 500);

  // Since we are using a debounce value, I need to handle the cases where a request hasn't fully finished and -
  // we end up with two different results, the ones for the first query and the last query.
  // To fix this isse I will be using an abort controller and send that abort signal to cancel the previus call.
  const abortController = new AbortController();

  const [data, setData] = useState<Movies>({ results: [] });

  const updateActiveGenreState = (newId: number) => {
    if (newId !== currentActiveGenre) {
      setActiveGenreElementStyle(
        newId,
        setCurrentActiveGenre,
        currentActiveGenre
      );
    }

    fetchMovieWithGenre(newId);
  };

  const fetchMovieWithGenre = async (
    activeGenre: number,
    abortSignal?: AbortSignal
  ) => {
    try {
      const url = "/discover/movie";
      const query = `&with_genres=${activeGenre}&vote_average.gte=${debounceRangeValue}`;

      const data = await API.fetch_data<Movies>(url, query, abortSignal);

      setData((prevState) => ({
        ...prevState,
        results: data.results,
      }));

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(true);
      setErrorMessage("An error has occured. Try again.");
    }
  };

  useEffect(() => {
    const abortSignal = abortController.signal;
    fetchMovieWithGenre(currentActiveGenre, abortSignal);

    return () => {
      setError(false);
      setErrorMessage("");
    };
  }, [genres, debounceRangeValue]);

  if (error) {
    return <ErrorPage error_message={errorMessage} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="content_wrapper flex_center">
      <Section title="Discover" wrap>
        {genres.genres.map((genre: any, key: number) => {
          return (
            <ActionSpan
              text={genre.name}
              key={key}
              id={genre.id.toString()}
              onClick={(e) =>
                updateActiveGenreState(parseInt(e.currentTarget.id))
              }
            />
          );
        })}
      </Section>

      <Section title="" wrap>
        <Closeable text={"Filters"}>
          <RangeSlider minVal={0} maxVal={10} />
        </Closeable>
      </Section>
      <Section title="">
        {data.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};
