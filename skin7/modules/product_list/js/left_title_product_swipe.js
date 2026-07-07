let productSwiper;

function product_list_A_c_swiper() {
    const container = document.querySelector('#container');
    const containerWidth = container.offsetWidth;

    let spaceBetween = 10;

    if (containerWidth >= 1025) {
        spaceBetween = 20;
    }

    productSwiper = new Swiper('.product_list_A_c .product_swiper', {
        speed: 800,
        loop: false,
        loopAdditionalSlides: 1,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
        slidesPerView: 'auto',
        spaceBetween: spaceBetween,
    });
}

product_list_A_c_swiper();

window.addEventListener('resize', () => {
    if (productSwiper) productSwiper.destroy(true, true);
    product_list_A_c_swiper();
});