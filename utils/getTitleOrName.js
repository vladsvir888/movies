export default (data) => {
  const { title, name } = data;
  return title ? title : name;
};
