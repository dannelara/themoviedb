import React, { useEffect, useState } from "react";
import { Section } from "components/section/Section";
import { MovieCard } from "components";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";
import { Loader } from "components";
import { ErrorPage } from "views";
import { GlobalStateContext } from "global/GlobalState";

interface Data {
  trendingMovies: Movies;
  nowPlayingMovies: Movies;
  topRatedMovies: Movies;
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
    trendingMovies: { results: [] },
    nowPlayingMovies: { results: [] },
    topRatedMovies: { results: [] },
  });

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const trending = await API.fetch_data<Movies>("/trending/movie/day");
      const now_playing = await API.fetch_data<Movies>("/movie/now_playing");
      const top_rated = await API.fetch_data<Movies>("/movie/top_rated");

      set_data((prevState) => ({
        ...prevState,
        trendingMovies: trending,
        nowPlayingMovies: now_playing,
        topRatedMovies: top_rated,
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
        {data.trendingMovies.results.slice(0, 2).map((movie, key: number) => {
          return <MovieCard big movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Now playing" wrap>
        {data.nowPlayingMovies.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Top rated" wrap>
        {data.topRatedMovies.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};

export default Home;
