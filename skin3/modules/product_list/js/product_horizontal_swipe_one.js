const product_list_C_d_a = new Swiper('.product_list_C_d_a .product_swiper', {
    slidesPerView: 1,
    speed: 800,
    loop: false,
    loopAdditionalSlides: 1,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"><span class="progress-bar"></span></span>`;
        }
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1025: {
            slidesPerView: 1,
            spaceBetween: 20,
        }
    }
});

function product_list_C_d_a_toggleFullWidthClass() {
    const section = document.querySelector('.product_list_C_d_a');
    if (!section) return;

    if (window.innerWidth <= 1024) {
        section.classList.remove('full_width');
    } else {
        section.classList.add('full_width');
    }
}

function product_list_C_d_a_toggleSwiperNav() {
    const pagination = document.querySelector('.product_list_C_d_a .swiper-pagination');
    const scrollbar = document.querySelector('.product_list_C_d_a .swiper-scrollbar');

    if (window.innerWidth <= 1024) {
        pagination?.classList.add('displaynone');
        scrollbar?.classList.remove('displaynone');
    } else {
        pagination?.classList.remove('displaynone');
        scrollbar?.classList.add('displaynone');
    }
}

function product_list_C_d_a_moveListTextForMobile() {
    const section = document.querySelector('.product_list_C_d_a');
    const bannerBox = section?.querySelector('.banner_box');
    const listText = section?.querySelector('.list_text');
    const contentLeft = section?.querySelector('.content_left');

    if (!bannerBox || !listText || !contentLeft) return;

    if (window.innerWidth <= 1024) {
        bannerBox.parentNode.insertBefore(listText, bannerBox);
    } else {
        contentLeft.insertBefore(listText, contentLeft.firstChild);
    }
}

function product_list_C_d_a_handleResponsiveActions() {
    product_list_C_d_a_toggleFullWidthClass();
    product_list_C_d_a_toggleSwiperNav();
    product_list_C_d_a_moveListTextForMobile();
}

document.addEventListener('DOMContentLoaded', function () {
    product_list_C_d_a_handleResponsiveActions();
    window.addEventListener('resize', product_list_C_d_a_handleResponsiveActions);
});