const hasLeftArea = document.body.querySelector('.left_area') !== null;

let swiperOptions = {
    spaceBetween: 14,
    slidesPerView: 4.1, // 기본 모바일용
    observer: true,
    observeParents: true,
    breakpoints: {
        1025: {
            spaceBetween: 45,
            slidesPerView: 'auto',
        }
    },
    freeMode: {
        enabled: true,
        sticky: true,
    },
    grabCursor: true,
};

// 일체형의 .left_area가 있을 때만 breakpoints 적용
if (hasLeftArea) {
    swiperOptions.breakpoints = {
        1025: {
            spaceBetween: 14,
            slidesPerView: 'auto',
        }
    };
}

let cateHighlightSwiper = new Swiper(".cate_highlight_B .cate_highlight_swiper", swiperOptions);

// 디바운스 함수 선언
function debounce(func, wait = 200) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

// 리사이즈 시 Swiper 업데이트
const updateSwiper = debounce(() => {
    if (cateHighlightSwiper) {
        cateHighlightSwiper.update();
    }

    // 모바일일체형에서 1024px 이상일 때 swiper-slide의 width 속성 제거
    if (hasLeftArea && window.innerWidth > 1024) {
        const swiperSlides = document.querySelectorAll(".cate_highlight_B .cate_highlight_swiper .swiper-slide");
        swiperSlides.forEach(slide => {
            if (slide && slide.style.width) {
                slide.style.removeProperty("width");
            }
        });
    }
}, 0);

window.addEventListener("resize", updateSwiper);