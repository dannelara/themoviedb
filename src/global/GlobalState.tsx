import React, { useState, useEffect } from "react";
import * as API from "fetch/fetch";
import { Movie } from "interfaces/Movie";
export const GlobalStateContext = React.createContext<any>(null);

const GlobalState = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const currentStoredMoview = JSON.parse(
    localStorage.getItem("movie_in_view") || "{}"
  );

  const [search_query, set_search_query] = useState("");

  const [current_moview_in_view, set_current_moview_in_view] =
    useState<Movie>(currentStoredMoview);

  const [genres, set_genres] = useState({ genres: [] });
  const [is_loading, set_is_loading] = useState(true);
  const [error, set_error] = useState(false);
  const [error_message, set_error_message] = useState("");

  const saveToLocalStorage = (movie: Movie) => {
    set_current_moview_in_view(movie);
    localStorage.setItem("movie_in_view", JSON.stringify(movie));
  };

  useEffect(() => {
    (async () => {
      set_genres(await API.fetch_data(`/genre/movie/list`));
    })();
  }, []);

  const state = {
    genres,
    search_query,
    set_search_query,
    current_moview_in_view,
    saveToLocalStorage,
    is_loading,
    set_is_loading,
    error,
    set_error,
    error_message,
    set_error_message,
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
