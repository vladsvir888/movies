export default (dateString) => {
  return new Date(dateString).toLocaleDateString().split(".").join(" / ");
};
