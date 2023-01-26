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

  const [searchQuery, setSearchQuery] = useState("");
  const [rangeval, setRangeval] = useState<number>(5);
  const [genres, set_genres] = useState({ genres: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentMoviewInView, setCurrentMoviewInView] =
    useState<Movie>(currentStoredMoview);

  const saveToLocalStorage = (movie: Movie) => {
    setCurrentMoviewInView(movie);
    localStorage.setItem("movie_in_view", JSON.stringify(movie));
  };

  useEffect(() => {
    (async () => {
      set_genres(await API.fetch_data(`/genre/movie/list`));
    })();
  }, []);

  const state = {
    genres,
    searchQuery,
    setSearchQuery,
    currentMoviewInView,
    saveToLocalStorage,
    isLoading,
    setIsLoading,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    rangeval,
    setRangeval,
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
