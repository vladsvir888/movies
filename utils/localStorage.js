export const getItemFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
