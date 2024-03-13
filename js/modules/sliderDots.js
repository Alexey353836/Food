
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