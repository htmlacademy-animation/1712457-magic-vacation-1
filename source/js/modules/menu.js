import PrizeCounter from "./prize-counter";

export default () => {
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);
  const prizesCountCases = new PrizeCounter('.js-prizes-count-cases', 1, 7);
  const prizesCountCodes = new PrizeCounter('.js-prizes-count-codes', 11, 900, true);
  prizesCountCases.start();
  prizesCountCodes.start();

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener(`click`, function () {
      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }

      const firstPrize = document.querySelector(`.prizes__item--journeys`);
      firstPrize.querySelector(`img`).setAttribute(`src`, `img/primary-award.svg`);

      const secondPrize = document.querySelector(`.prizes__item--cases`);
      secondPrize.querySelector(`img`).setAttribute(`src`, `img/secondary-award.svg`);

      const additionalPrize = document.querySelector(`.prizes__item--codes`);
      additionalPrize.querySelector(`img`).setAttribute(`src`, `img/additional-award.svg`);

      prizesCountCases.restart();
      prizesCountCodes.restart();
    });
  }
};
