export const buildQuery = (object: Record<string, unknown>): string => {
  const preparedObject = {} as Record<string, string>;

  for (const key in object) {
    const value = object[key];

    if (!value) {
      continue;
    }

    preparedObject[key] = String(value);
  }

  return new URLSearchParams(preparedObject).toString();
};
