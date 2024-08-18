import type { Media } from "~/src/shared/config";

export const getTitleOrName = (data: Media): string | undefined => {
  const { title, name } = data;

  return title ? title : name;
};
