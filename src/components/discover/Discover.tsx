import React, { useEffect, useState } from "react";
import "./Styles.css";
import { Loader } from "utils/loader/Loader";
import { GlobalStateContext } from "global/GlobalState";
import { Section } from "components/section/Section";
import { ActionSpan } from "utils/actionSpan/ActionSpan";
import * as API from "fetch/fetch";
import Movies from "interfaces/Movie";
import { MovieCard } from "utils/cards";
import { ErrorPage } from "components/errorPage/ErrorPage";

export const Discover: React.FC = ({}) => {
  const {
    genres,
    is_loading,
    set_is_loading,
    error,
    set_error,
    error_message,
    set_error_message,
  } = React.useContext(GlobalStateContext);
  const [data, set_data] = useState<Movies>({ results: [] });

  const fetch_movie_with_genre = async (
    event?: React.MouseEvent<HTMLElement>
  ) => {
    set_is_loading(true);
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
      set_is_loading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_movie_with_genre();
  }, [genres]);

  if (is_loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage error_message={error_message} />;
  }

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
    </div>
  );
};
