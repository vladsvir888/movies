const getOffset = (element) => {
  if (!element) {
    return;
  }

  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
};

export default getOffset;
