import React, { useRef, useState, useEffect } from "react";
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
import { RangeSlider } from "utils/rangeSlider/RangeSlider";
import useDebounceValue from "utils/debounce/useDebounceValue";

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
    setRangeval,
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
        {genres.genres.slice(0, 8).map((genre: any, key: number) => {
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
        <RangeSlider minVal={0} maxVal={10} />
      </Section>
      <Section title="">
        {data.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};
