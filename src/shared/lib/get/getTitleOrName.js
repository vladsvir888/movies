export const getTitleOrName = (data) => {
  const { title, name } = data;

  return title ? title : name;
};
