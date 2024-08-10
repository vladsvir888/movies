export const getItemFromLocalStorage = (key: string): unknown => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }
};

export const setItemInLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
