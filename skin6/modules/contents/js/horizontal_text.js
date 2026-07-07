// 콘텐츠 슬라이드
const content_D_a = new Swiper('.content_D_a .content_swiper', {
    slidesPerView: 'auto',
    speed: 800,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
    },
});