export default (param) => {
  return computed(() => useRoute().params[param]);
};
