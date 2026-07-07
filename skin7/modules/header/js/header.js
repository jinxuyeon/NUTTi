// 모바일 스크롤 이벤트
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    if (window.innerWidth <= 1024) {
        if (window.scrollY > 70) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    } else {
        header.classList.remove('fixed');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // top_banner에 따른 header fixed 추가
    const header = document.getElementById('header');
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

    updateBannerHeight();
    handleScroll();

    window.addEventListener('resize', () => {
        updateBannerHeight();
        handleScroll();
    });
    window.addEventListener('scroll', handleScroll);

    // 카테고리 이벤트
    const category = document.querySelector('#header .inner .top_category');

    let isDown = false;
    let startX;
    let scrollLeft;

    category.addEventListener('mousedown', (e) => {
        isDown = true;
        category.classList.add('dragging');
        startX = e.pageX - category.offsetLeft;
        scrollLeft = category.scrollLeft;

        // 링크 기본동작 막기
        if (e.target.tagName === 'A') {
            e.preventDefault(); // 링크로 이동 막기
        }
    });

    category.addEventListener('mouseleave', () => {
        isDown = false;
        category.classList.remove('dragging');
    });

    category.addEventListener('mouseup', (e) => {
        isDown = false;
        category.classList.remove('dragging');

        // 클릭 방지 (드래그 중 클릭이 발생하는 것을 막음)
        if (e.target.tagName === 'A') {
            e.preventDefault();
        }
    });

    category.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - category.offsetLeft;
        const walk = (x - startX) * 1.5; // 이동 속도
        category.scrollLeft = scrollLeft - walk;
    });
});