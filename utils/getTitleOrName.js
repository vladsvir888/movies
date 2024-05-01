export default (data) => {
  return computed(() => {
    const { title, name } = data;

    return title ? title : name;
  });
};
