const header = document.querySelector('header');

// 모바일 스크롤 이벤트
window.addEventListener('scroll', function () {

    if (window.scrollY > window.innerHeight) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // top_banner에 따른 header fixed 추가
    const topBanners = document.querySelectorAll('.top_banner');

    let totalBannerHeight = 0;

    function updateBannerHeight() {
        totalBannerHeight = 0;
        topBanners.forEach(banner => {
            totalBannerHeight += banner.offsetHeight;
        });
    }

    function handleScroll() {
        if (window.scrollY > totalBannerHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > totalBannerHeight + header.offsetHeight) {
            header.classList.add('white_bg');
        } else {
            header.classList.remove('white_bg');
        }
    });

    updateBannerHeight();
    handleScroll();

    window.addEventListener('resize', () => {
        updateBannerHeight();
        handleScroll();
    });
    window.addEventListener('scroll', handleScroll);

    // searchBarForm에 top값 적용
    const searchIcon = document.querySelector('#header .top_mypage .eSearch');
    const bannerClose = document.querySelectorAll('.top_banner .btn_banner_close');

    searchIcon.addEventListener('click', function () {
        searchBarTop();
    });
    bannerClose.forEach(function(btn) {
        btn.addEventListener('click', function () {
            searchBarTop();
        });
    });

    function searchBarTop() {
        const header = document.getElementById('header');
        const searchBarForm = document.getElementById('searchBarForm');

        if (header && searchBarForm) {
            const headerRect = header.getBoundingClientRect();
            let headerBottom;

            if (header.classList.contains('fixed')) {
                // fixed 상태일 때는 뷰포트 기준 위치
                headerBottom = headerRect.bottom;
                searchBarForm.style.position = 'fixed';
            } else {
                // fixed 아닐 때는 스크롤 위치까지 더하기
                headerBottom = headerRect.bottom + window.scrollY;
                searchBarForm.style.position = 'absolute';
            }

            searchBarForm.style.top = `${headerBottom}px`;
        }
    }
});