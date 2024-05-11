export default (isScrollbar) => {
  if (isScrollbar) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};
