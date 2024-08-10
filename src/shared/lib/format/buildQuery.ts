export const buildQuery = (object: Record<string, string>): string => {
  return new URLSearchParams(object).toString();
};
