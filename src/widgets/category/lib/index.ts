import type { MediaCategories } from "~/src/shared/config";

type TransformCategory<T> = T extends `${infer First}_${infer Rest}`
  ? `${First}${Capitalize<TransformCategory<Rest>>}`
  : T;

export const transformCategory = <T extends MediaCategories>(
  value: T,
): TransformCategory<T> => {
  return value
    .split("_")
    .map((item, index) => {
      if (index !== 0) {
        item = item[0].toUpperCase() + item.slice(1);
      }
      return item;
    })
    .join("") as TransformCategory<T>;
};
