import Animation from '../helpers/animation.js';
import Scene2D from './scene-2d.js';
import animMethod from '../helpers/utils.js';

const IMG_BASE_PATH = `./img/module-4/win-primary-images`;

const IMAGES_URLS = Object.freeze({
  plane: `${IMG_BASE_PATH}/airplane.png`,
  tree: `${IMG_BASE_PATH}/tree.png`,
  tree2: `${IMG_BASE_PATH}/tree-2.png`,
  ice: `${IMG_BASE_PATH}/ice.png`,
  seaCalf: `${IMG_BASE_PATH}/sea-calf-2.png`,
  snowflake: `${IMG_BASE_PATH}/snowflake.png`
});


const ELEMENTS = Object.freeze({
  plane: {
    imageId: `plane`,
    x: 90,
    y: 50,
    size: 10,
    opacity: 0,
    transforms: {
      translateY: -12
    }
  },
  tree: {
    imageId: `tree`,
    x: 62,
    y: 60,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 30
    }
  },
  tree2: {
    imageId: `tree2`,
    x: 58,
    y: 58,
    size: 5,
    opacity: 0,
    transforms: {
      translateY: 30
    }
  },
  ice: {
    imageId: `ice`,
    x: 50,
    y: 70,
    size: 40,
    opacity: 0,
    transforms: {
      translateY: 30
    }
  },
  seaCalf: {
    imageId: `seaCalf`,
    x: 48,
    y: 62,
    size: 50,
    opacity: 0,
    transforms: {
      translateY: 30
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 29,
    y: 58,
    size: 20,
    opacity: 0,
    transforms: {
      rotate: -30
    }
  },
  snowflake2: {
    imageId: `snowflake`,
    x: 71,
    y: 65,
    size: 15,
    opacity: 0,
    transforms: {
      rotate: 30,
      scaleX: -1
    }
  },
});


const LOCALS = Object.freeze({
  blob: {
    centerX: 45,
    centerY: 55,
    radius: 15,
    endX: 87,
    endY: 53,
    angle: 45,
    deltasLength: 10,
    opacity: 0
  }
});


export default class WinCanvasAnimation extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`win_primary_scene`);

    super({
      canvas,
      elements: ELEMENTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.afterInit = () => {
      this.elements.plane.before = this.drawBlob.bind(this);
    };

    this.initEventListeners();
    this.initElements(ELEMENTS);
    this.initLocals();
    this.updateSize();
  }


  initLocals() {
    this.locals = {
      blob: {
        centerX: LOCALS.blob.centerX,
        centerY: LOCALS.blob.centerY,
        radius: LOCALS.blob.radius,
        endX: LOCALS.blob.endX,
        endY: LOCALS.blob.endY,
        angle: LOCALS.blob.angle,
        deltasLength: LOCALS.blob.deltasLength,
        opacity: LOCALS.blob.opacity
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

    this.initPlaneAnimations();
    this.initBlobAnimations();
    this.initTreesAnimations();
    this.initSeaCalfAnimations();
    this.initSnowflakesAnimations();
  }


  initPlaneAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.elements.plane.transforms.translateX = -39 * progressReversed;
        this.elements.plane.transforms.translateY =
          5 * Math.sin(Math.PI * progressReversed) - 14 * progressReversed;
        this.elements.plane.transforms.rotate =
          45 * Math.sin(Math.PI * progressReversed) + 44 * progressReversed;
        this.elements.plane.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: animMethod.easeInQuad
    }));
  }


  initBlobAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.locals.blob.radius = 14 * progress;
        this.locals.blob.centerY = 55 - 15 * progressReversed;
        this.locals.blob.endX = 87 - 35 * progressReversed;
        this.locals.blob.endY = 53 - 12 * progressReversed;
        this.locals.blob.angle = 40 + 120 * progressReversed;
        this.locals.blob.deltasLength = 10 * progress;
        this.locals.blob.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: animMethod.easeInQuad
    }));
  }


  initTreesAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.tree.transforms.translateY = 30 * (1 - progress);
        this.elements.tree.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: animMethod.easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.tree2.transforms.translateY = 30 * (1 - progress);
        this.elements.tree2.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: animMethod.easeInQuad
    }));
  }


  initSeaCalfAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.elements.seaCalf.transforms.translateY = 30 * progressReversed;
        this.elements.seaCalf.transforms.rotate = -30 * Math.sin(progressReversed * 2);

        this.elements.ice.transforms.translateY = 30 * progressReversed;
        this.elements.ice.transforms.rotate = -30 * Math.sin(progressReversed * 2);
      },
      duration: 2000,
      delay: 1000,
      easing: animMethod.easeOutElastic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.seaCalf.opacity = progress;
        this.elements.ice.opacity = progress;
      },
      duration: 100,
      delay: 1000,
      easing: animMethod.easeInQuad
    }));
  }


  initSnowflakesAnimations() {
    this.animations.push(new Animation({
      func: (progress, details) => {
        this.elements.snowflake.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        this.elements.snowflake2.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`,
      delay: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.snowflake.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: animMethod.easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.elements.snowflake2.opacity = progress;
      },
      duration: 500,
      delay: 1900,
      easing: animMethod.easeInQuad
    }));
  }


  drawBlob() {
    const b = this.locals.blob;
    const angle = b.angle * Math.PI / 180;

    if (b.opacity === 0) {
      return;
    }

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = b.opacity;
    this.ctx.fillStyle = `#acc3ff`;

    this.ctx.beginPath();
    this.ctx.arc(
        b.centerX * s,
        b.centerY * s,
        b.radius * s,
        Math.PI / 2,
        Math.PI * 3 / 2
    );
    this.ctx.bezierCurveTo(
        (b.centerX + 10) * s,
        (b.centerY - b.radius) * s,
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        b.endX * s,
        b.endY * s
    );
    this.ctx.bezierCurveTo(
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        (b.centerX + 30) * s,
        (b.centerY + b.radius) * s,
        b.centerX * s,
        (b.centerY + b.radius) * s
    );

    this.ctx.fill();
    this.ctx.restore();
  }
}
