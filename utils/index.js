export const transformDate = (value) => {
  return new Date(value).toLocaleDateString().split(".").join(" / ");
};
