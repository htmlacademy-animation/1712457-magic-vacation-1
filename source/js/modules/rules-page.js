export default () => {
  const rulesItems = document.querySelectorAll('.rules__item');
  const rulesLink = document.querySelector('.js-rules__link');
  const RULES_SHOW_CLASS_NAME = 'rules__link_show';

  const hideBtnRules = () => {
    rulesLink.classList.remove(RULES_SHOW_CLASS_NAME);
  };

  const showBtnRules = () => {
    rulesLink.classList.add(RULES_SHOW_CLASS_NAME);
  };

  if (rulesItems.length && rulesLink) {
    const lastItem = rulesItems[rulesItems.length - 1];
    lastItem.addEventListener('animationend', showBtnRules);

    document.body.addEventListener('screenChanged', hideBtnRules);
  }
};
