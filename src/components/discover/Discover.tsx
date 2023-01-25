import React, { useEffect, useState } from "react";
import "./Styles.css";
import { Loader } from "utils/loader/Loader";
import { GlobalStateContext } from "global/GlobalState";
import { Section } from "utils/section/Section";
import { ActionSpan } from "utils/actionSpan/ActionSpan";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";
import { MovieCard } from "utils/cards";

export const Discover: React.FC = ({}) => {
  const { genres } = React.useContext(GlobalStateContext);
  const [data, set_data] = useState<Movies>({ results: [] });

  const fetch_movie_with_genre = async (
    event?: React.MouseEvent<HTMLElement>
  ) => {
    try {
      if (event) {
        const url = "/discover/movie";
        const query = `&with_genres=${event.currentTarget.id}`;

        const data = await API.fetch_data<Movies>(url, query);

        set_data((prevState) => ({
          ...prevState,
          results: data.results,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_movie_with_genre();
  }, [genres]);

  return (
    <div className="content_wrapper flex_center">
      <Section title="Discover">
        <div className="flex_container">
          {genres.genres.map((genre: any, key: number) => {
            return (
              <ActionSpan
                text={genre.name}
                key={key}
                id={genre.id.toString()}
                onClick={fetch_movie_with_genre}
              />
            );
          })}
        </div>
      </Section>
      <Section title="">
        {data.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
      {/* <Loader /> */}
    </div>
  );
};
