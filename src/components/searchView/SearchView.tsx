import { GlobalStateContext } from "global/GlobalState";
import Movies from "interfaces/Movie";
import React, { useEffect, useState } from "react";

import * as API from "fetch/fetch";
import { Section } from "components/section/Section";
import { MovieCard } from "utils/cards";

export const SearchView: React.FC = ({}) => {
  const {
    search_query,
    set_search_query,
    is_loading,
    set_is_loading,
    error,
    set_error,
    error_message,
    set_error_message,
  } = React.useContext(GlobalStateContext);

  const [data, set_data] = useState<Movies>({
    results: [],
  });

  useEffect(() => {
    (async () => {
      if (search_query) {
        const data = await API.fetch_data<Movies>(
          "/search/movie",
          `&query=${search_query}`
        );

        set_data((prevState) => ({
          ...prevState,
          results: data.results,
        }));
      }
    })();

    // console.log(data);
  }, [search_query]);

  // console.log(data);
  return (
    <div className="content_wrapper flex_center">
      <Section title="Search">
        {data.results.map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })}
      </Section>
    </div>
  );
};
