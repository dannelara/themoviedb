export type Movie = {
  id: number;
  poster_path: String;
  release_date: String;
  genre_ids: number[];
  title: String;
};

export default interface Movies {
  results: Movie[];
}
