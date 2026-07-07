document.addEventListener('DOMContentLoaded', function () {
    const subCate01 = document.querySelectorAll('#header .inner .top_nav_box .top_category > ul > li');
    const subCate02 = document.querySelectorAll('#header .inner .top_nav_box .top_category .sub_cate01 li');

    //subCate01.forEach(function (li) {
    //    const menu = li.querySelector('a');
    //    const subMenu = li.querySelector('.sub_cate01');
    //    if (menu) {
    //        menu.addEventListener('click', function (e) {
    //            if (subMenu) {
    //                e.preventDefault();
    //                subCate01.forEach(function (otherLi) {
    //                    if (otherLi !== menu) {
    //                        otherLi.classList.remove('active');
    //                    }
    //                });
    //                li.classList.toggle('active');
    //            }
    //        });
    //    }
    //});

    subCate02.forEach(function (li) {
        const menu = li.querySelector('a');
        const subMenu = li.querySelector('.sub_cate02');

        if (menu) {
            menu.addEventListener('click', function (e) {
                if (subMenu) {
                    e.preventDefault();
                    subCate02.forEach(function (otherLi) {
                        if (otherLi !== menu) {
                            otherLi.classList.remove('active');
                        }
                    });
                    li.classList.toggle('active');
                }
            });
        }
    });
});

// 모바일 스크롤 이벤트
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    if (window.innerWidth <= 1024) {
        if (window.scrollY > 70) {
            header.classList.add('fixed', 'white_bg');
        } else {
            header.classList.remove('fixed', 'white_bg');
        }
    } else {
        header.classList.remove('fixed', 'white_bg');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // searchBarForm에 top값 적용
    const searchIcon = document.querySelector('#header .top_mypage .eSearch');
    const searchDimmed = document.querySelector('.search_dimmed');
    const bannerClose = document.querySelectorAll('.top_banner .btn_banner_close');
    const header = document.getElementById('header');
    const searchBarForm = document.querySelector('.mo #searchBarForm');

    searchIcon.addEventListener('click', function () {
        const body = document.querySelector('body');
        if (body.classList.contains('expand')) {
            body.classList.remove('expand')
        }
        searchBarTop();
    });
    searchDimmed.addEventListener('click', function () {
        searchIcon.click();
    });
    bannerClose.forEach(function (btn) {
        btn.addEventListener('click', function () {
            searchBarTop();
        });
    });

    function searchBarTop() {
        const header = document.getElementById('header');

        if (header && searchBarForm) {
            const headerRect = header.getBoundingClientRect();
            let headerBottom;

            if (header.classList.contains('fixed')) {
                // fixed 상태일 때는 뷰포트 기준 위치
                headerBottom = headerRect.bottom;
            } else {
                // fixed 아닐 때는 스크롤 위치까지 더하기
                headerBottom = headerRect.bottom + window.scrollY;
            }

            searchBarForm.style.position = 'fixed';
            searchBarForm.style.top = `${headerBottom}px`;
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let searchLinker = document.querySelector('#header .search_linker');
    let searchForm = document.getElementById('searchBarForm');
    if (searchLinker && searchForm) {
        searchLinker.addEventListener('click', function (event) {
            event.preventDefault(); // 기본 이동 막기
            searchForm.submit();    // 폼 제출
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let resizeTimeout = null;
    let wheelHandler = null;

    function setupHeaderScrollLock() {
        const header = document.querySelector('#header.layout3');
        const headerInner = header?.querySelector('.inner');
        const container = document.querySelector('#container');

        if (!headerInner || !container) return;

        // 기존 이벤트 제거
        if (wheelHandler) {
            window.removeEventListener('wheel', wheelHandler, { passive: false });
        }

        // 휠 이벤트 새 정의
        wheelHandler = function (e) {
            if (window.innerWidth <= 1024) return;

            const mouseX = e.clientX;
            const headerRect = header.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const isInHeaderOrMargin =
                e.target.closest('#header') ||
                (mouseX < containerRect.left && mouseX < headerRect.right);

            if (!isInHeaderOrMargin) return;

            e.preventDefault();
            e.stopPropagation();
            headerInner.scrollTop += e.deltaY;
        };

        // 이벤트 등록
        window.addEventListener('wheel', wheelHandler, { passive: false });
    }

    // 최초 실행
    setTimeout(setupHeaderScrollLock, 300);

    // 리사이즈 대응 (디바운스)
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupHeaderScrollLock, 400);
    });
});