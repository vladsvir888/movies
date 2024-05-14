export default (isScrollbarVisible) => {
  if (isScrollbarVisible) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};
