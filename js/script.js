'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          sliderDots = require('./modules/sliderDots'),
          forms = require('./modules/forms'),
          cartsMenu = require('./modules/cartsMenu');

    tabs();
    modal();
    timer();
    sliderDots();
    // forms();
    cartsMenu();
});

 



