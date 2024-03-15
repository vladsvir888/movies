export default (value) => {
  return value
    .split("_")
    .map((item, index) => {
      if (index !== 0) {
        item = item[0].toUpperCase() + item.slice(1);
      }

      return item;
    })
    .join("");
};
