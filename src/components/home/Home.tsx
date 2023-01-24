import React, { useEffect, useState } from "react";

import { SearchBar } from "components/searchbar/SearchBar";
import { Section } from "components/section/Section";
import { MovieCard } from "components/cards/MovieCard";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const [trending_movies, set_trending_movies] = useState<Movies>({
    results: [],
  });

  const [now_playing_movies, set_now_playing_movies] = useState<Movies>({
    results: [],
  });
  const [top_rated_movies, set_top_rated_movies] = useState<Movies>({
    results: [],
  });

  const fetchPopularMovies = async () => {
    const sub_url_path = "/trending/movie/day";
    const data = await API.fetch_data<Movies>(sub_url_path);

    set_trending_movies(data);
  };

  const fetchNowPlayingMovies = async () => {
    const sub_url_path = "/movie/now_playing";
    const data = await API.fetch_data<Movies>(sub_url_path);

    set_now_playing_movies(data);
  };

  const fetchTopRatedMovies = async () => {
    const sub_url_path = "/movie/top_rated";
    const data = await API.fetch_data<Movies>(sub_url_path);

    set_top_rated_movies(data);
  };
  useEffect(() => {
    fetchPopularMovies();
    fetchNowPlayingMovies();
    fetchTopRatedMovies();
  }, []);
  return (
    <div>
      <Section title="Trending">
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
      </Section>
    </div>
  );
};
