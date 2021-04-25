export default class AnimationText {
  constructor(
    elementSelector,
    timer,
    initDelay,
  ) {
    this.elementSelector = elementSelector;
    this.timer = timer;
    this.element = document.querySelector(this.elementSelector);
    this.timeOffset = initDelay || 0;

    this.prePareText();
  }

  generatorDelay(offset, index) {
    let result = offset;
    if ((index+1) % 3 === 1) {
      result +=90;
    }
    if ((index+1) % 3 === 2) {
      result -= 45;
    }
    if ((index+1) % 3 === 0) {
      result += 60;
    }
    return result;
  }

  createElement(letter, index) {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.transition = `transform ${this.timer}ms ease ${this.timeOffset}ms`;
    this.timeOffset = this.generatorDelay(this.timeOffset, index);
    return span;
  }

  prePareText() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(` `);

    const content = text.reduce((fragmentParent, word, index) => {
      const wordElement = Array.from(word).reduce((fragment, latter, i) => {
        fragment.appendChild(this.createElement(latter, i));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement('span');
      wordContainer.classList.add('per-letter-anim__word');
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      if (index !== text.length - 1) {
        const space = document.createTextNode(' ');
        fragmentParent.appendChild(space)
      }
      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = '';
    this.element.appendChild(content);
  }
}
