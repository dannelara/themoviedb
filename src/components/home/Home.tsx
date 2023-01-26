import React, { useEffect, useState } from "react";
import { Section } from "components/section/Section";
import { MovieCard } from "utils/cards";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";
import { Loader } from "utils/loader/Loader";
import { ErrorPage } from "components/errorPage/ErrorPage";
import { GlobalStateContext } from "global/GlobalState";

interface Data {
  trending_movies: Movies;
  now_playing_movies: Movies;
  top_rated_movies: Movies;
}

const Home: React.FC = ({}) => {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    errorMessage,
    setErrorMessage,
  } = React.useContext(GlobalStateContext);

  const [data, set_data] = useState<Data>({
    trending_movies: { results: [] },
    now_playing_movies: { results: [] },
    top_rated_movies: { results: [] },
  });

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const trending = await API.fetch_data<Movies>("/trending/movie/day");
      const now_playing = await API.fetch_data<Movies>("/movie/now_playing");
      const top_rated = await API.fetch_data<Movies>("/movie/top_rated");

      set_data((prevState) => ({
        ...prevState,
        trending_movies: trending,
        now_playing_movies: now_playing,
        top_rated_movies: top_rated,
      }));

      setIsLoading(false);
    } catch (error: any) {
      setError(true);
      setErrorMessage("An error has occured. Try again.");
    }
  };

  useEffect(() => {
    fetchData();
    // Reset incase we got an error when the page was loading so that it wont cause issues
    // inside of other components.
    return () => {
      setError(false);
      setErrorMessage("");
    };
  }, []);

  if (error) {
    return <ErrorPage error_message={errorMessage} />;
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Section title="Trending">
        {data.trending_movies.results.slice(0, 2).map((movie, key: number) => {
          return <MovieCard big movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Now playing" wrap>
        {data.now_playing_movies.results.map((movie, key: number) => {
          // Fixa så att filmer utan specifik inte används.
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Top rated" wrap>
        {data.top_rated_movies.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};

export default Home;
