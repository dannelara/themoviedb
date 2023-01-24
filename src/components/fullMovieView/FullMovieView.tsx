import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as API from "fetch/fetch";
import "./Styles.css";
import { Section } from "components/section/Section";
import { MovieCard } from "components/cards/MovieCard";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const FullMovieView: React.FC = () => {
  const [cast, set_cast] = useState([]);

  //   const [data, set_data] = useState({});
  const movie_id = useQuery().get("id");

  const data_to_fetch = [
    {
      name: "details",
      path: `
      /movie/${movie_id}/credits`,
    },
    {
      name: "video",
      path: `/movie/${movie_id}/videos`,
    },
  ];

  const fetchData = async () => {
    set_cast(await API.fetch_data(`/movie/${movie_id}/credits`));
    // data_to_fetch.forEach(async (data) => {
    //   const data_response = await API.fetch_data(`${data.path}`);
    //   console.log(data_response);
    //   set_data({
    //     ...data,
    //     data_response,
    //   });
    // });
  };

  useEffect(() => {
    fetchData();
    // console.log(cast);
    // console.log(data);
  }, []);
  return (
    <div className="wrapper">
      <Section title="Cast">
        {/* {cast.slice(0, 2).map((movie, key: number) => {
          return <MovieCard movie={movie} key={key} />;
        })} */}
      </Section>
    </div>
  );
};
