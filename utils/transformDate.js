export default (value) => {
  return new Date(value).toLocaleDateString().split(".").join(" / ");
};
