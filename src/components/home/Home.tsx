import React, { useEffect, useState } from "react";

import { Section } from "utils/section/Section";
import { MovieCard } from "utils/cards";
import * as API from "fetch/fetch";

import Movies from "interfaces/Movie";

const Home: React.FC = ({}) => {
  const [data, set_data] = useState({});

  // const [trending_movies, set_trending_movies] = useState<Movies>({
  //   results: [],
  // });

  // const [now_playing_movies, set_now_playing_movies] = useState<Movies>({
  //   results: [],
  // });

  // const [top_rated_movies, set_top_rated_movies] = useState<Movies>({
  //   results: [],
  // });

  const fetchData = async () => {
    try {
      set_data((prevState) => ({
        ...prevState,
        ["trending_movies"]: API.fetch_data<Movies>("/trending/movie/day"),
        ["now_playing_movies"]: API.fetch_data<Movies>("/movie/now_playing"),
        ["top_rated_movies"]: API.fetch_data<Movies>("/movie/top_rated"),
      }));

      // await API.fetch_data<Movies>("/trending/movie/day", set_trending_movies);
      // await API.fetch_data<Movies>("/movie/now_playing");
      // await API.fetch_data<Movies>("/movie/top_rated", set_top_rated_movies);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    console.log(data);
    // console.log(Object.keys(data));
  }, []);

  return (
    <div>
      {/* <Section title="Trending">
        {trending_movies.results.slice(0, 2).map((movie, key: number) => {
          return <MovieCard big movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Now playing">
        {now_playing_movies.results.slice(0, 5).map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
      <Section title="Top rated">
        {top_rated_movies.results.slice(0, 5).map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section> */}
    </div>
  );
};

export default Home;
