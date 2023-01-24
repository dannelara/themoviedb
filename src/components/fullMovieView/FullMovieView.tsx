import React, { useEffect, useState } from "react";

import * as API from "fetch/fetch";
import "./Styles.css";
import { Section } from "utils/section/Section";
import { ActorCard } from "utils/cards";
import MovieDetails from "interfaces/MovieDetails";
import { GlobalStateContext } from "global/GlobalState";

const FullMovieView: React.FC = () => {
  const { current_moview_in_view } = React.useContext(GlobalStateContext);

  const { genres } = React.useContext(GlobalStateContext);

  const [cast, set_cast] = useState<MovieDetails>({
    cast: [],
  });

  const [movie_genres, set_movie_genres] = useState([]);
  const [movie_key, set_movie_key] = useState<any>();

  const fetchData = async () => {
    if (current_moview_in_view.id) {
      API.fetch_data<any>(
        `/movie/${current_moview_in_view.id}/videos`,
        set_movie_key
      );

      //   set_movie_key(test_vieo.results[test_vieo.results.length - 1].key);
      API.fetch_data<MovieDetails>(
        `/movie/${current_moview_in_view.id}/credits`,
        set_cast
      );
      //   set_cast(
      //     await API.fetch_data<MovieDetails>(
      //       `/movie/${current_moview_in_view.id}/credits`,set_cast
      //     )
      //   );
    }
  };

  const load_genres = () => {
    return current_moview_in_view.genre_ids.map((id: number) => {
      return genres.genres.filter((e: any) => e.id === id)[0];
    });
  };

  useEffect(() => {
    fetchData();

    if (current_moview_in_view && genres) {
      set_movie_genres(load_genres());
    }

    // console.log(movie_key.results[movie_key.results.length - 1]);
  }, [genres]);

  return (
    <div className="wrapper">
      <Section title="Genres">
        {movie_genres.map((e: any, key: number) => {
          return (
            <p className="text_xsmall text_big" key={key}>
              {e.name}
            </p>
          );
        })}
      </Section>
      <Section title="Actors">
        {cast.cast.slice(0, 4).map((actor, key: number) => {
          return <ActorCard data={actor} key={key} />;
        })}
      </Section>

      <Section title="Trailer">
        <div className="movie_player_container">
          {movie_key && (
            <iframe
              id="player"
              itemType="text/html"
              width="100%"
              height="390"
              src={`https://www.youtube.com/embed/${
                movie_key.results[movie_key.results.length - 1].key
              }?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}
            ></iframe>
          )}
        </div>
      </Section>
    </div>
  );
};

export default FullMovieView;
