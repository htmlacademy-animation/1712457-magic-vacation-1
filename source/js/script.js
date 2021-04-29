// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import basePage from './modules/base-page.js';
import rulesPage from './modules/rules-page.js';
import AnimationText from './modules/animation-text.js';

// init modules
basePage();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rulesPage();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const animationTitle = new AnimationText('.js-animation-text', 400);
const animationIntroDate = new AnimationText('.intro__date', 400, 550);
