import WinCanvasAnimation from './win-canvas-animation.js';

export default () => {
  document.querySelectorAll(`.game__button`).forEach((button) => {
    button.addEventListener(`click`, () => {
      if (button.dataset.target === `result`) {
        const winCanvasAnim = new WinCanvasAnimation();
        winCanvasAnim.start();
      }
    });
  });
};
