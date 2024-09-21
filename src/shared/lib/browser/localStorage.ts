// https://gist.github.com/srvice-temp/046126458bbed2239e0b8d6403bced18
export const cacheKey = {
  // appLangKey: "movie-universe-lang",
} as const;

type CacheKeyValues = (typeof cacheKey)[keyof typeof cacheKey];

type CacheValues = {
  // [cacheKey.appLangKey]: string;
};

interface CacheUtil {
  set: <T extends CacheKeyValues>(key: T, object: CacheValues[T]) => void;
  get: <T extends CacheKeyValues>(key: T) => CacheValues[T] | null;
  remove: (key: CacheKeyValues) => void;
}

export const cacheUtil: CacheUtil = {
  set: (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
  },
  get: (key) => JSON.parse(String(localStorage.getItem(key))),
  remove: (key) => localStorage.removeItem(key),
};
