export default (number) => {
  if (typeof number !== "number") {
    return;
  }

  return number.toLocaleString();
};
