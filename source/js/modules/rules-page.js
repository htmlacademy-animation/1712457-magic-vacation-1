import sceneIntro from '../helpers/scene-intro';
import sceneStory from '../helpers/story-scene';

export default () => {
  const rulesItems = document.querySelectorAll(`.rules__item`);
  const rulesLink = document.querySelector(`.js-rules__link`);
  const RULES_SHOW_CLASS_NAME = `rules__link_show`;

  const hideBtnRules = () => {
    rulesLink.classList.remove(RULES_SHOW_CLASS_NAME);
  };

  const showBtnRules = () => {
    rulesLink.classList.add(RULES_SHOW_CLASS_NAME);
  };

  const introScreenAnimation = (screenName) => {
    const sceneIntroEl = new sceneIntro();
    if (screenName === `top`) {
      sceneIntroEl.start();
    } else {
      sceneIntroEl.stop();
    }
  };

  function storyScreenAnimation(screenName) {
    const sceneStoryEl = new sceneStory();
    if (screenName === `story`) {
      sceneStoryEl.start();
    } else {
      sceneStoryEl.stop();
    }
  }

  if (rulesItems.length && rulesLink) {
    const lastItem = rulesItems[rulesItems.length - 1];
    lastItem.addEventListener(`animationend`, showBtnRules);

    document.body.addEventListener(`screenChanged`, (e) => {
      introScreenAnimation(e.detail.screenName);
      storyScreenAnimation(e.detail.screenName);
      if (e.detail.screenName !== `rules`) {
        hideBtnRules();
      }
    });
  }
};
