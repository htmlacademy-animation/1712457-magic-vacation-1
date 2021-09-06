export default class PrizeCounter {
  constructor(
    elementSelector,
    startCount,
    endCount,
    mod,
  ) {
    this.elementSelector = elementSelector;
    this.mod = mod;
    this.startCount = startCount;
    this.endCount = endCount;
    this.element = document.querySelector(this.elementSelector);
    this.currentCount = this.startCount;
    this.requestId = null;
    this.FPS = 12;
    this.countFrame = 0;
  }

  start() {
    this.beginCounter();
  }

  restart () {
    this.currentCount = this.startCount;
    this.countFrame = 0;
    this.beginCounter();
  }

  beginCounter() {
    setTimeout(() => {
      if (this.currentCount >= this.endCount) {
        cancelAnimationFrame(this.requestId);
        this.element.innerHTML = this.endCount;
      } else if (this.mod) {
        this.currentCount += this.currentCount * this.countFrame;
        this.element.innerHTML = Math.min(this.currentCount, this.endCount);
        this.countFrame += 1;
        this.requestId = requestAnimationFrame(() => {this.beginCounter()});
      } else {
        this.element.innerHTML = this.currentCount;
        this.currentCount += 1;
        this.requestId = requestAnimationFrame(() => {this.beginCounter()});
      }
    }, 1000 / this.FPS);
  }
};
