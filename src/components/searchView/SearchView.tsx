import { GlobalStateContext } from "global/GlobalState";
import Movies from "interfaces/Movie";
import React, { useEffect, useState } from "react";
import * as API from "fetch/fetch";
import { Section } from "components/section/Section";
import { MovieCard } from "utils/cards";
import useDebounceValue from "utils/debounce/useDebounceValue";
import { ErrorPage } from "components/errorPage/ErrorPage";

export const SearchView: React.FC = ({}) => {
  const {
    searchQuery,
    error,
    setError,
    errorMessage,
    setSearchQuery,
    setErrorMessage,
  } = React.useContext(GlobalStateContext);

  // Since I dont want the application to make a request everytime the user writes something to the search input
  // I'm using a debunce value function to wait 500ms before the use effect sees the updated query string and -
  // makes the API call.
  const debounce_query = useDebounceValue(searchQuery, 500);

  // Since we are using a debounce value, I need to handle the cases where a request hasn't fully finished and -
  // we end up with two different results, the ones for the first query and the last query.
  // To fix this isse I will be using an abort controller and send that abort signal to cancel the previus call.
  const abortController = new AbortController();

  const [data, set_data] = useState<Movies>({
    results: [],
  });

  const [noResults, setNoResults] = useState(false);

  const filterResultBasedOnRating = (data: {
    results: [{ vote_average: number }];
  }) => {
    return data.results.sort((a, b) => a.vote_average - b.vote_average);
  };

  const fetchData = async (
    debounce_query: String,
    abortSignal: AbortSignal
  ) => {
    const data = await API.fetch_data<Movies>(
      "/search/movie",
      `&query=${debounce_query}`,
      abortSignal
    );

    console.log(data);
    if (data.results.length > 0)
      set_data((prevState) => ({
        ...prevState,
        results: data.results,
      }));
    else {
      setNoResults(true);
    }
  };

  useEffect(() => {
    const abortSignal = abortController.signal;
    setNoResults(false);
    try {
      (async () => {
        if (!debounce_query) {
          set_data((prevState) => ({
            ...prevState,
            results: [],
          }));

          return;
        }

        fetchData(debounce_query, abortSignal);
      })();
    } catch (error) {
      setError(true);
      setErrorMessage("An error has occured. Try again.");
    }

    // If the component is rendered again it means that the query has been updated -
    // and this will set the signal to abort the previus request.
    return () => abortController.abort("Cancel request");
  }, [debounce_query]);

  if (error) {
    return <ErrorPage error_message={errorMessage} />;
  }

  return (
    <div className="content_wrapper flex_center">
      <Section title="Search">
        <Section title={searchQuery && "Top results"}>
          {noResults ? (
            <div className="flex_center">
              <span className="">
                No results found for {'"' + debounce_query + '"'}{" "}
              </span>
            </div>
          ) : (
            data.results.map((movie, key: number) => {
              return <MovieCard movie={movie} key={key} />;
            })
          )}
        </Section>
      </Section>
    </div>
  );
};

{
  /* <div className="flex_center">
<span className="">{current_moview_in_view.overview}</span>
</div> */
}
