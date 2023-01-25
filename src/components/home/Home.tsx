import React, { useEffect, useState } from "react";
import { Section } from "utils/section/Section";
import { MovieCard } from "utils/cards";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";
import { Loader } from "utils/loader/Loader";
import { ErrorPage } from "components/errorPage/ErrorPage";

interface Data {
  trending_movies: Movies;
  now_playing_movies: Movies;
  top_rated_movies: Movies;
}

const Home: React.FC = ({}) => {
  const [loading, is_loading] = useState(false);
  const [error, set_error] = useState(false);
  const [error_message, set_error_message] = useState("");

  const [data, set_data] = useState<Data>({
    trending_movies: { results: [] },
    now_playing_movies: { results: [] },
    top_rated_movies: { results: [] },
  });

  const fetchData = async () => {
    is_loading(true);
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
    } catch (error: any) {
      set_error(true);
      set_error_message("An error has occured. Try again.");
    }
    is_loading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage error_message={error_message} />;
  }

  return (
    <div>
      <Section title="Trending">
        {data.trending_movies.results.slice(0, 2).map((movie, key: number) => {
          return <MovieCard big movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Now playing">
        {data.now_playing_movies.results
          .slice(0, 5)
          .map((movie, key: number) => {
            return <MovieCard movie={movie} key={key} />;
          })}
      </Section>
      <Section title="Top rated">
        {data.top_rated_movies.results.slice(0, 5).map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};

export default Home;
