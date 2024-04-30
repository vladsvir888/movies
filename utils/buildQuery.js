export default (object) => {
  return new URLSearchParams(object).toString();
};
