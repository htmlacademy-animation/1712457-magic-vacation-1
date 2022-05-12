import Animation from '../helpers/animation.js';
import Scene2D from './scene-2d.js';
import animMethod from '../helpers/utils.js';

const IMG_BASE_PATH = `./img/module-4/lose-images`;


const IMAGES_URLS = Object.freeze({
  key: `${IMG_BASE_PATH}/key.png`,
  crocodile: `${IMG_BASE_PATH}/crocodile.png`,
  drop: `${IMG_BASE_PATH}/drop.png`,
  flamingo: `${IMG_BASE_PATH}/flamingo.png`,
  watermelon: `${IMG_BASE_PATH}/watermelon.png`,
  leaf: `${IMG_BASE_PATH}/leaf.png`,
  snowflake: `${IMG_BASE_PATH}/snowflake.png`,
  saturn: `${IMG_BASE_PATH}/saturn.png`,
});


const ELEMENTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 17,
    opacity: 0,
    transforms: {
      translateY: 0
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 50,
    y: 55,
    size: 80,
    transforms: {
      translateX: 200,
      translateY: 0,
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 55,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 55,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  drop: {
    imageId: `drop`,
    x: 47.5,
    y: 58,
    size: 3,
    opacity: 0,
    transforms: {
      scaleX: 1,
      scaleY: 0,
    }
  },
});

const LOCALS = Object.freeze({
  keyholeMask: {
    centerX: 50,
    centerY: 50,
  }
});


export default class CrocodileAnimation extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-scene`);

    super({
      canvas,
      elements: ELEMENTS,
      imagesUrls: IMAGES_URLS,
    });

    this.afterInit = () => {
      this.elements.crocodile.after = this.drawKeyholeMask.bind(this);
    };

    this.initEventListeners();
    this.initElements(ELEMENTS);
    this.initLocals();
  }

  initLocals() {
    this.locals = {
      keyholeMask: {
        centerX: LOCALS.keyholeMask.centerX,
        centerY: LOCALS.keyholeMask.centerY
      }
    };
  }


  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));


    this.initKeyAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
  }


  drawKeyholeMask() {
    const m = this.locals.keyholeMask;
    const width = this.elements.key.size;

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.fillStyle = `#5f458c`;

    this.ctx.beginPath();

    this.ctx.moveTo((m.centerX + width * 3) * s, (m.centerY + width * 0.85) * s);
    this.ctx.lineTo((m.centerX + width * 0.5) * s, (m.centerY + width * 0.85) * s);
    this.ctx.lineTo((m.centerX + width * 0.33) * s, (m.centerY + width * 0.005) * s);
    this.ctx.bezierCurveTo((m.centerX + width * 0.8) * s, (m.centerY - width * 0.5) * s, (m.centerX + width * 0.1) * s, (m.centerY - width) * s, (m.centerX + width * 0.2) * s, (m.centerY - width) * s);
    this.ctx.lineTo((m.centerX + width * 3) * s, (m.centerY - width) * s);

    this.ctx.fill();
    this.ctx.restore();
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.key.opacity = progress;
      },
      duration: 800,
      easing: animMethod.easeInCubic
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.flamingo.opacity = progress;
        this.elements.flamingo.transforms.scaleX = progress;
        this.elements.flamingo.transforms.scaleY = progress;
        this.elements.flamingo.transforms.translateX = -30 * progress;
        this.elements.flamingo.transforms.translateY = -10 * progress;
      },
      delay: 200,
      duration: 1200,
      easing: animMethod.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.flamingo.transforms.translateY += 3 * progress;
      },
      delay: 1700,
      duration: 1800,
      easing: animMethod.easeOutExpo
    }));
  }


  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.watermelon.opacity = progress;
        this.elements.watermelon.transforms.scaleX = progress;
        this.elements.watermelon.transforms.scaleY = progress;
        this.elements.watermelon.transforms.translateX = -30 * progress;
        this.elements.watermelon.transforms.translateY = 10 * progress;
      },
      delay: 200,
      duration: 1200,
      easing: animMethod.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.watermelon.transforms.translateY += 3 * progress;
      },
      delay: 1700,
      duration: 1800,
      easing: animMethod.easeOutExpo
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.leaf.opacity = progress;
        this.elements.leaf.transforms.scaleX = progress;
        this.elements.leaf.transforms.scaleY = progress;
        this.elements.leaf.transforms.translateX = 30 * progress;
        this.elements.leaf.transforms.translateY = -10 * progress;
      },
      delay: 200,
      duration: 1200,
      easing: animMethod.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.leaf.transforms.translateY += 5 * progress;
      },
      delay: 1700,
      duration: 1800,
      easing: animMethod.easeOutExpo
    }));
  }


  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.snowflake.opacity = progress;
        this.elements.snowflake.transforms.scaleX = progress;
        this.elements.snowflake.transforms.scaleY = progress;
        this.elements.snowflake.transforms.translateX = 15 * progress;
        this.elements.snowflake.transforms.translateY = -5 * progress;
      },
      delay: 200,
      duration: 1200,
      easing: animMethod.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.snowflake.transforms.translateY += 3 * progress;
      },
      delay: 1700,
      duration: 1800,
      easing: animMethod.easeOutExpo
    }));
  }


  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.saturn.opacity = progress;
        this.elements.saturn.transforms.scaleX = progress;
        this.elements.saturn.transforms.scaleY = progress;
        this.elements.saturn.transforms.translateX = 30 * progress;
        this.elements.saturn.transforms.translateY = 10 * progress;
      },
      delay: 200,
      duration: 1200,
      easing: animMethod.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.saturn.transforms.translateY += 3 * progress;
      },
      delay: 1700,
      duration: 1800,
      easing: animMethod.easeOutExpo
    }));
  }


  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.elements.crocodile.transforms.translateX = 50 * progressReversed;
        this.elements.crocodile.transforms.translateY = -10 * progressReversed;
      },
      delay: 1000,
      duration: 1000,
      easing: animMethod.easeInCubic
    }));
  }


  initDropAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        setInterval(() => {
          this.elements.drop.opacity = 1.5 * progress;
          this.elements.drop.transforms.scaleY = progress;
        }, 2000);
      },
      delay: 500,
      duration: 2000,
      easing: animMethod.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        setInterval(() => {
          this.elements.drop.transforms.translateY = 5 * progress;
        }, 1000);
      },
      delay: 2500,
      duration: 1000,
      easing: animMethod.easeInCubic
    }));
  }
}
