export const isEmptyObject = (value: Record<string, unknown>): boolean => {
  return Object.keys(value).length === 0;
};
