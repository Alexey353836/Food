/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cartsMenu.js":
/*!*********************************!*\
  !*** ./js/modules/cartsMenu.js ***!
  \*********************************/
/***/ ((module) => {

function cartsMenu() {
   
    //  Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }
           
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

     new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        24,
        '.menu .container',
        'menu__item'
    ).render();

}

module.exports = cartsMenu;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms () {
    // form-json
const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const res =  await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMassage = document.createElement('img');
        statusMassage.src = message.loading;
        statusMassage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
    
        form.insertAdjacentElement('afterend', statusMassage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        // const object = {};
        // formData.forEach(function(value, key) {
        //     object[key] = value;
        // });
       
        // fetch("server.php", {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(object)
        // })
        postData('http://localhost:3000/requests', json)
        // .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMassage.remove();
        })
        .catch(() => {
            showThanksModal(message.failure);
        })
        .finally(() => {
            form.reset();
        });
    });
}

function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
   
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {
    
    //  Modal

    const  modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');
            // modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
         // modal.classList.add('show');
        // modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
         // modal.classList.add('hide');
        // modal.classList.remove('show');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
   });

    // modalCloseBtn.addEventListener('click', closeModal);
       
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight -1) {
            openModal(); 
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/sliderDots.js":
/*!**********************************!*\
  !*** ./js/modules/sliderDots.js ***!
  \**********************************/
/***/ ((module) => {


//  Slider Carousel with + dots
function sliderDots() {
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;  // Ширина главного окна
    let slideIndex = 1,
        offset = 0; // Отступ при перемешении слайда

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    }if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    
    }if (slides.length >= 10) {
        total.textContent = `${slides.length}`;
    }if (slideIndex >= 10){
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // Обшая ширина слайлов
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {slide.style.width = width}); // Ограничеваем ширину каждого слайда

    //  dots
    function dots() {
            
        const slider = document.querySelector('.offer__slider');
        slider.style.position = 'relative';

        const indicators = document.createElement('ol'),
            dotsField = [];
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dot.setAttribute('data-slide-to', i+1);

            if (i == 0) {
                dot.style.opacity = '1';
            }
            indicators.append(dot);
            dotsField.push(dot);
        }


        function navigation() {
            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            
            }else {
                current.textContent = slideIndex;
            }

            dotsField.forEach(dot => dot.style.opacity = '.5');
            dotsField[slideIndex -1].style.opacity = '1';
        }

        next.addEventListener('click', () => {
            if (offset == +width.slice(0, width.length - 2) * (slides.length -1)) {
                offset = 0;
            }else {
            offset += +width.slice(0, width.length - 2);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {
                slideIndex = 1;
            }else {
                slideIndex++;
            }

            navigation();

        });

        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length -1);  
            }else {
            offset -= +width.slice(0, width.length - 2);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            }else {
                slideIndex--;
            }

            navigation();

        });

        dotsField.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = +width.slice(0, width.length - 2) * (slideTo -1); 

                slidesField.style.transform = `translateX(-${offset}px)`;

                navigation();

            });
        });
    }
    dots();

} 
sliderDots();
// 89

module.exports = sliderDots

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs () {
       // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');


   function hideContent() {
       tabsContent.forEach(item => {
           // item.style.display = 'none';
           item.classList.add('hide');
           item.classList.remove('show', 'fade');
       });

       tabs.forEach(item => {
           item.classList.remove('tabheader__item_active');
       });
   }


   function showTabContent(i = 0) {
       // tabsContent[i].style.display = 'block';
       tabsContent[i].classList.add('show', 'fade');
       tabsContent[i].classList.remove('hide');
       tabs[i].classList.add('tabheader__item_active');
   }

    hideContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
       const target = event.target;

   if (target && target.classList.contains('tabheader__item')) {
           tabs.forEach((item, i) => {
               if (target == item) {
                   hideContent();
                   showTabContent(i);
               }
           });
       }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer () {
     //  Timer
   
     const deadline = new Date('2024-02-22');
     deadline.setHours(0);
 
      function getTimeRemaning(endtime) {
         let days, hours, minutes, seconds;
         const t = Date.parse(endtime) - Date.parse(new Date());
 
             if (t <= 0) {
                 days = 0;
                 hours = 0;
                 minutes = 0;
                 seconds = 0;
             }else {
                 days = Math.floor(t / (1000 * 60 * 60 * 24)),
                 hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                 minutes = Math.floor((t / 1000 / 60) % 60),
                 seconds = Math.floor((t / 1000) % 60);
             }
 
         return {
             'total': t,
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
         };
      }
 
      function getZero(num) {
         if (num >= 0 && num < 10){
             return `0${num}`;
         }else {
             return num;
         }
      }
 
      function setClock(selector, endtime) {
         const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timeInterval = setInterval(updateClock, 1000);
 
         updateClock();
 
         function updateClock() {
             const t = getTimeRemaning(endtime);
 
             days.innerHTML = getZero(t.days);
             hours.innerHTML =  getZero(t.hours);
             minutes.innerHTML =  getZero(t.minutes);
             seconds.innerHTML =  getZero(t.seconds);
 
             if (t.total <= 0) {
                 clearInterval(timeInterval);
             }
         }
      }
 
      setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          sliderDots = __webpack_require__(/*! ./modules/sliderDots */ "./js/modules/sliderDots.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          cartsMenu = __webpack_require__(/*! ./modules/cartsMenu */ "./js/modules/cartsMenu.js");

    tabs();
    modal();
    timer();
    sliderDots();
    // forms();
    cartsMenu();
});

 




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map