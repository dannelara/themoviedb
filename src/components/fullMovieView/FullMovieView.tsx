import React, { useEffect, useState } from "react";
import * as API from "fetch/fetch";
import "./Styles.css";
import { Section } from "utils/section/Section";
import { ActorCard } from "utils/cards";
import MovieDetails, { Actor } from "interfaces/MovieDetails";
import { GlobalStateContext } from "global/GlobalState";

const FullMovieView: React.FC = () => {
  const { current_moview_in_view, genres } =
    React.useContext(GlobalStateContext);
  const [error, set_error] = useState(false);
  const [error_message, set_error_message] = useState("");

  const [data, set_data] = useState<MovieDetails>({
    cast: [],
    video_key: "",
  });

  const [movie_genres, set_movie_genres] = useState([]);

  const fetchData = async () => {
    try {
      const cast = await API.fetch_data<{ cast: Actor[] }>(
        `/movie/${current_moview_in_view.id}/credits`
      );

      const video_key_response = await API.fetch_data<{
        results: [{ key: any }];
      }>(`/movie/${current_moview_in_view.id}/videos`);

      set_data((prevState) => ({
        ...prevState,
        cast: cast.cast,
        video_key:
          video_key_response.results[video_key_response.results.length - 1].key,
      }));
    } catch (error) {}
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
  }, [genres]);

  return (
    <div className="wrapper">
      <Section title="Genres">
        {movie_genres.map((e: any, key: number) => {
          return (
            <p className="text_xsmall text_big default_color" key={key}>
              {e.name}
            </p>
          );
        })}
      </Section>
      <Section title="Actors">
        {data.cast.slice(0, 4).map((actor, key: number) => {
          return <ActorCard data={actor} key={key} />;
        })}
      </Section>

      <Section title="Trailer">
        <div className="movie_player_container">
          {data.video_key && (
            <iframe
              id="player"
              itemType="text/html"
              width="100%"
              height="390"
              src={`https://www.youtube.com/embed/${data.video_key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`}
            ></iframe>
          )}
        </div>
      </Section>
    </div>
  );
};

export default FullMovieView;
