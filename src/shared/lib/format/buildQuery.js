export const buildQuery = (object) => {
  return new URLSearchParams(object).toString();
};
