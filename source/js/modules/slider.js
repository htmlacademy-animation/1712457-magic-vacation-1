import Swiper from "swiper";

const emitChangeDisplayEvent = (activeIndex) => {
  const event = new CustomEvent(`slideChange`, {detail: {active: activeIndex}});
  document.body.dispatchEvent(event);
};

export default class Slider {
  constructor() {
    this.storySlider = ``;

    this.mainBody = document.querySelector(`body`);
    this.prevSliderTheme = `screen--theme-default`;
  }

  setSlider() {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      this.storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            emitChangeDisplayEvent(this.storySlider.activeIndex);
          },
          resize: () => {
            this.storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      this.storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            emitChangeDisplayEvent(this.storySlider.activeIndex);
          },
          resize: () => {
            this.storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  }

  setSliderTheme(theme) {
    let currentTheme = `screen--theme-${theme}`;
    this.mainBody.classList.remove(this.prevSliderTheme);
    this.prevSliderTheme = currentTheme;
    this.mainBody.classList.add(currentTheme);
  }

  clearTheme() {
    this.mainBody.classList.remove(this.prevSliderTheme);
  }

  revertTheme() {
    this.mainBody.classList.add(this.prevSliderTheme);
  }

  init() {
    window.addEventListener(`resize`, () => {
      if (this.storySlider) {
        this.storySlider.destroy();
      }
      this.setSlider();
    });

    this.setSlider();
  }
}
