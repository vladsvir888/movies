export const getHoursAndMinutes = (min) => {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  return {
    hours,
    minutes,
  };
};
