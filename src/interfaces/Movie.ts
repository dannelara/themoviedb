export type Movie = {
  id: number;
  poster_path: String;
  release_date: String;
  title: String;
};

export default interface Movies {
  results: Movie[];
}
