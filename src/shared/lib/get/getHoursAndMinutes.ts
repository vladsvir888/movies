type HoursAndMinutes = {
  hours: number;
  minutes: number;
};

export const getHoursAndMinutes = (min: number): HoursAndMinutes => {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  return {
    hours,
    minutes,
  };
};
