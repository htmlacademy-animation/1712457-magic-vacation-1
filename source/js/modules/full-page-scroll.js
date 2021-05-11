import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor(revertTheme, clearTheme) {
    this.THROTTLE_TIMEOUT = 2000;
    this.SCREEN_ACTIVE_DELAY_TIMEOUT = 100;
    this.SCREEN_ANIM_BG_ACTIVE_CLASS = `screen__anim-bg--active`;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.screenAnimBg = document.querySelector(`.js-screen__anim-bg`);

    this.revertTheme = () => {
      revertTheme();
    };

    this.clearTheme = () => {
      clearTheme();
    };

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const activeScreen = this.screenElements[this.activeScreen];
    let prevActiveScreen = this.screenElements[0];

    this.screenElements.forEach((screen) => {
      if (screen.classList.contains(`active`)) {
        prevActiveScreen = screen;
      }
    });

    if (activeScreen.classList.contains(`screen--story`)) {
      this.revertTheme();
    } else {
      this.clearTheme();
    }

    if (prevActiveScreen.classList.contains(`screen--story`) && activeScreen.classList.contains(`screen--prizes`)) {
      this.screenAnimBg.classList.add(this.SCREEN_ANIM_BG_ACTIVE_CLASS);
      this.screenAnimBg.addEventListener(`transitionend`, this.handleTransitionEndScreenBg.bind(this));
      this.screenAnimBg.addEventListener(`webkitTransitionend`, this.handleTransitionEndScreenBg.bind(this));
    } else {
      this.hideScreenElements();
      this.showActiveElement();
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }

  hideScreenElements() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
  }

  showActiveElement() {
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, this.SCREEN_ACTIVE_DELAY_TIMEOUT);
  }

  handleTransitionEndScreenBg() {
    this.hideScreenElements();
    this.screenAnimBg.classList.remove(this.SCREEN_ANIM_BG_ACTIVE_CLASS);
    this.showActiveElement();
    this.screenAnimBg.removeEventListener(`transitionend`, this.handleTransitionEndScreenBg);
    this.screenAnimBg.removeEventListener(`webkitTransitionend`, this.handleTransitionEndScreenBg);
  }
}
