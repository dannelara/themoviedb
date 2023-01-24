export type Actor = {
  cast_id: number;
  character: String;
  id: number;
  name: String;
  profile_path: String;
};

export default interface MovieDetails {
  cast: Actor[];
}
