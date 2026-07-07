function checkAsideC() {
    const asideC = document.querySelector('#aside.aside_C');
    if (!asideC) return;

    let isHidden = false;
    let parent = asideC.parentElement;

    while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.display === 'none') {
            isHidden = true;
            break;
        }
        parent = parent.parentElement;
    }

    if (!isHidden) {
        applyAsideC(asideC);
    }
}

function applyAsideC(asideC) {
    // 중복 적용 방지
    if (asideC.dataset.applied === 'true') return;
    asideC.dataset.applied = 'true';

    // 스타일 적용
    const style = document.createElement('style');
    style.textContent = `
    body.layout_mobile.expand { overflow: hidden; }
    body.layout_mobile.expand #aside { left: 0; visibility: visible; }
    body.layout_mobile.expand #layoutDimmed { display: none; }
    `;
    asideC.appendChild(style);

    document.addEventListener('DOMContentLoaded', function () {
        const bottomNav = document.querySelector('.bottom_nav');
        const aside = document.getElementById('aside');

        if (bottomNav && aside) {
            function setAsideHeightMobileOnly() {
                const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                const bottomNavHeight = bottomNav.offsetHeight || 0;

                // height 계산
                aside.style.height = `${Math.max(0, viewportHeight - bottomNavHeight + 1)}px`;

                // 현재 스크롤된 높이 + bottomNav 높이만큼 top 적용
                aside.style.top = `${window.scrollY}px`;
            }

            window.addEventListener('resize', setAsideHeightMobileOnly);
            window.addEventListener('scroll', setAsideHeightMobileOnly); // 스크롤 감지 추가
            setAsideHeightMobileOnly();
        }
    });

    const btnNavs = document.querySelectorAll('#aside .btnClose');
    btnNavs.forEach(function (btnNav) {
        btnNav.addEventListener('click', function () {
            document.body.classList.toggle('expand');
        });
    });
}

// 초기 실행
checkAsideC();

// 리사이즈 시 재확인
window.addEventListener('resize', checkAsideC);