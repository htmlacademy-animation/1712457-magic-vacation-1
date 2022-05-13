import WinCanvasAnimation from './win-canvas-animation.js';
import CrocodileAnimation from './crocodile-canvas-animation.js';

export default () => {
  document.querySelectorAll(`.game__button`).forEach((button) => {
    button.addEventListener(`click`, () => {
      if (button.dataset.target === `result`) {
        const winCanvasAnim = new WinCanvasAnimation();
        winCanvasAnim.start();
      } else if (button.dataset.target === `result3`) {
        const crocodileAnim = new CrocodileAnimation();
        crocodileAnim.start();
      }
    });
  });
};
