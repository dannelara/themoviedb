import { SearchBar } from "components/searchbar/SearchBar";
import React, { useEffect, useState } from "react";
import "./Styles.css";
import * as API from "fetch/fetch";
import { Section } from "components/section/Section";
import { CardBig } from "components/card/CardBig";
export const Main: React.FC = ({}) => {
  const [data, set_data] = useState<any>();

  const fetchPopularMovies = async () => {
    const sub_url_path = "/trending/movie/day";
    const data = await API.fetch_data(sub_url_path);
    set_data(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="main">
      <SearchBar />

      <Section title="Trending">
        {data?.results.slice(0, 2).map((dta: any, key: number) => {
          return (
            <CardBig
              poster_path={dta.backdrop_path}
              title={dta.title}
              release={dta.release_date}
              id={dta.id}
              key={key}
            />
          );
        })}
      </Section>
    </div>
  );
};
