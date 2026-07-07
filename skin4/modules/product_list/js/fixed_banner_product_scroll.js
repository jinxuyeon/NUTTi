// 모바일 상품 슬라이드
let product_list_E_a = null;
function product_list_E_a_swiper() {
    const isMobile = window.innerWidth <= 1024;
    if (isMobile && !product_list_E_a) {

        product_list_E_a = new Swiper('.product_list_E_a .product_swiper', {
            slidesPerView: 2,
            spaceBetween: 10,
            resizeObserver: true,
            observer: true,
            observeParents: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
        });
    } else if (!isMobile && product_list_E_a) {
        product_list_E_a.destroy(true, true);
        product_list_E_a = null;
    }
}

// 초기 실행
window.addEventListener('DOMContentLoaded', () => {
    product_list_E_a_swiper();
});
window.addEventListener('resize', () => {
    product_list_E_a_swiper();
});