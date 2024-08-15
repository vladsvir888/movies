// https://typescript.tips/from-union-to-tuple/
type TuplifyUnion<U extends string, R extends unknown[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TuplifyUnion<Exclude<U, S>, [...R, S]>;
}[U];

export type MediaTypes = "movie" | "tv";

export type MediaCategories =
  | "popular"
  | "now_playing"
  | "top_rated"
  | "upcoming";

export type MediaItem = {
  type: MediaTypes;
  category: MediaCategories;
  title: string;
};
export type MediaTypesTuple = TuplifyUnion<MediaTypes>;

export type MediaList = {
  [K in MediaTypes]: MediaItem[];
};
