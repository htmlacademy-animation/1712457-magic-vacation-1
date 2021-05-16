export default () => {
  const loadPage = () => {
    document.body.classList.add(`loaded`);
  };

  window.addEventListener(`load`, loadPage);
};
