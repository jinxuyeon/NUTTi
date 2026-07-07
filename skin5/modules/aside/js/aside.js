function checkAsideB() {
    const asideB = document.querySelector('#aside.aside_B');
    if (!asideB) return;

    let isHidden = false;
    let parent = asideB.parentElement;

    while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.display === 'none') {
            isHidden = true;
            break;
        }
        parent = parent.parentElement;
    }

    if (!isHidden) {
        applyAsideB(asideB);
    }
}

function applyAsideB(asideB) {
    // 중복 적용 방지
    if (!asideB.querySelector('style[data-aside-style]')) {
        // 스타일 적용
        const style = document.createElement('style');
        style.setAttribute('data-aside-style', 'true');
        style.textContent = `
        body.expand { overflow: hidden; }
        body.expand #layout > #wrap,
        body.expand #layout > #header,
        body.expand #layout > #footer,
        body.expand #layout > .top_banner { filter: blur(3px); }
        body.expand #aside { left: 0; visibility: visible; }
        body.expand #layoutDimmed { display: block; }
        `;
        asideB.appendChild(style);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const bottomNav = document.querySelector('.bottom_nav');
        const aside = document.getElementById('aside');

        if (bottomNav && aside) {
            function setAsideHeightMobileOnly() {
                const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                const bottomNavHeight = bottomNav.offsetHeight || 0;
                aside.style.height = `${Math.max(0, viewportHeight - bottomNavHeight)}px`;
            }

            window.addEventListener('resize', setAsideHeightMobileOnly);
            setAsideHeightMobileOnly();
        }

        // 모바일 aside 닫기 버튼
        const moAside = document.querySelector('#aside.aside_B');
        const moBtnClose = document.querySelector('#aside.aside_B + .btnClose');
        if (moAside && moBtnClose) {
            moBtnClose.addEventListener('click', function () {
                document.body.classList.remove('expand');
            });
        }
    });
}

// 기존 PC용 aside 닫기 버튼
const btnNav = document.querySelector('.btnClose');
if (btnNav) {
    btnNav.addEventListener('click', function () {
        document.body.classList.toggle('expand');
    });
}

function isElementHidden(element) {
    let current = element;
    while (current) {
        const style = window.getComputedStyle(current);
        if (style.display === 'none') return true;
        current = current.parentElement;
    }
    return false;
}

// 초기 실행
checkAsideB();

// 리사이즈 시 확인
window.addEventListener('resize', checkAsideB);