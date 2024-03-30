export default (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return {
    hours,
    minutes,
  };
};
