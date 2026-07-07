// 멀티샵 버튼 클릭
const bodyEl = document.querySelector('body');
const dimmed = document.querySelector('.dimmed');

// 검색창
const btnSearch = document.querySelector('#header .eSearch');
const searchForm = document.querySelector('#searchBarForm');
if(btnSearch){
    btnSearch.addEventListener('click', function() {
        if (bodyEl.classList.contains('searchExpand')) {
            setTimeout(() => {
                bodyEl.classList.remove('searchExpand');
            }, 200);
        }
    });
}

// 딤드 클릭 시 닫기
dimmed.addEventListener('click', function() {
    if (bodyEl.classList.contains('expand')) {
        bodyEl.classList.remove('expand');
    }
    if (bodyEl.classList.contains('searchExpand')) {
        bodyEl.classList.remove('searchExpand');
    }
    if (multishopPopup.classList.contains('active')) {
        multishopPopup.classList.remove('active');
        dimmed.classList.remove('active');
    }
});

// 레이아웃 변경 버튼 클릭
const changeBtn = document.querySelector('.change_layout button');
const changeDepth01 = document.querySelector('.change_layout .depth01');
const changeDepth01A = document.querySelectorAll('.change_layout .depth01 > li > a');
const changeDepth02 = document.querySelector('.change_layout .depth02');
const changeDepth02A = document.querySelectorAll('.change_layout .depth02 > li > a');

if(changeBtn){
    changeBtn.addEventListener('click', function(e) {
        e.preventDefault();
    
        const isActive01 = changeDepth01.classList.contains('active');
        const isActive02 = changeDepth02.classList.contains('active');
    
        if (isActive01 || isActive02) {
            changeDepth01.classList.remove('active');
            changeDepth02.classList.remove('active');
    
            changeDepth01.querySelectorAll('li').forEach(function(li) {
                li.classList.remove('dpnone');
            });
            changeDepth02.querySelectorAll('li').forEach(function(li) {
                li.classList.remove('dpnone');
            });
    
            changeDepth01A.forEach(function(a) {
                a.classList.remove('dpnone');
            });
            changeDepth02A.forEach(function(a) {
                a.classList.remove('dpnone');
            });
        } else {
            changeDepth01.classList.add('active');
        }
    });
}

// depth01 항목 클릭
changeDepth01A.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.tagName.toLowerCase() === 'a') {
            this.classList.add('dpnone');
        }

        const depth02 = this.parentElement.querySelector('.depth02');
        if (depth02) {
            depth02.classList.add('active');
        }

        const siblings = Array.from(this.closest('li').parentElement.children);
        siblings.forEach(function(sibling) {
            if (sibling !== anchor.closest('li')) {
                sibling.classList.add('dpnone');
            }
        });
    });
});

// 장바구니 팝업 함수
var cartPopupFunc = function() {
    var basketSelectors = [
        '.xans-product-basketadd',
        '.xans-order-layerbasketpackage'
    ];

    document.addEventListener('click', function(e) {
        try {
            var target = e.target;

            // 두 종류의 장바구니 레이어 체크
            for (var i = 0; i < basketSelectors.length; i++) {
                var basketLayer = target.closest(basketSelectors[i]);
                if (basketLayer && target === basketLayer) {
                    basketLayer.remove();
                    break;
                }
            }
        } catch(e) { }
    });
};
cartPopupFunc();

// 홍보문구 있을때 검색창 클릭 이벤트
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const bannerAction = document.querySelector("#banner_action");
        const btnSearch = document.querySelector(".xans-layout-searchheader span");
        const searchValue = document.querySelector(".xans-layout-searchheader #keyword").value;
        let bannerValue = bannerAction ? bannerAction.value : "";
        
        if (window.innerWidth <= 1024 && bannerAction) {
            bannerAction.value = "";
            
            if (btnSearch && bannerValue) {
                btnSearch.addEventListener("click", function () {
                    const newValue = document.querySelector(".xans-layout-searchheader #keyword").value;
                    if(searchValue === newValue){
                        window.location.href = bannerValue;
                    }
                });
            }
        }    
    }, 300);

    /* const input = document.querySelector("#contents .keyword");
    const btnDelete = document.querySelector("#contents .searchField .btnDelete");

    if (!input || !btnDelete) return;

    function toggleDeleteButton() {
        console.log('input.value = ',input.value);
        
        if (input.value.trim() !== "") {
            btnDelete.style.display = "block";
        } else {
            btnDelete.style.display = "none";
        }
    }

    input.addEventListener("input", toggleDeleteButton);

    toggleDeleteButton();

    btnDelete.addEventListener("click", function () {
        input.value = "";
        toggleDeleteButton();
        input.focus();
    }); */
});

// 상품 옵션 레이어
const modals = document.querySelectorAll(".ec-base-layer.typeModal");
const contents = document.querySelector("#contents");
const btnOpen = document.querySelectorAll(".EC-stockdesign");

btnOpen.forEach(btn => {
    btn.addEventListener("click", function () {
        if (!modals.length || !contents) return;
        updateModalPositions();
    });
});

function updateModalPositions() {
    if (window.innerWidth >= 1024) {
        const rect = contents.getBoundingClientRect();

        modals.forEach(modal => {
            modal.style.left = rect.left + "px";
            modal.style.width = rect.width + "px";
        });
    } else {
        // 1024 미만일 때는 기본 스타일로 초기화
        modals.forEach(modal => {
            modal.style.left = "";
            modal.style.width = "";
        });
    }
}

/* 레이아웃 클래스명 업데이트 */
(function () {
    const container = document.getElementById('container');
    if (!container) return;

    // 분기점 설정
    const BREAKPOINTS = [850, 767, 599, 500, 440, 400];
    const ALL_CLASSES = BREAKPOINTS.map(bp => `layout_${bp}`);

    function updateLayoutClasses() {
        const width = container.getBoundingClientRect().width;

        bodyEl.classList.remove(...ALL_CLASSES);
        for (const bp of BREAKPOINTS) {
        if (width <= bp) bodyEl.classList.add(`layout_${bp}`);
        }
    }

    // 초기 실행
    updateLayoutClasses();

    // 리사이즈
    let ticking = false;
    window.addEventListener('resize', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
        updateLayoutClasses();
        ticking = false;
        });
    });
})();

// 상품 목록 아이템 클릭 처리 (1024px 초과 데스크톱에서만)
(function() {
    var clickHandlers = new Map();

    function initClickHandlers() {
        document.querySelectorAll('.main_product_list.typeDimmed .prdList__item').forEach(function(item) {
            if (clickHandlers.has(item)) return;

            item.style.cursor = 'pointer';

            var handler = function(e) {
                // 버튼이나 기존 링크 클릭은 무시
                if (e.target.closest('button, .likeButton, .icon__box, a')) {
                    return;
                }

                // 상품 링크로 이동
                var link = this.querySelector('.thumbnail a');
                if (link && link.href) {
                    window.location.href = link.href;
                }
            };

            item.addEventListener('click', handler);
            clickHandlers.set(item, handler);
        });
    }

    function removeClickHandlers() {
        clickHandlers.forEach(function(handler, item) {
            item.style.cursor = '';
            item.removeEventListener('click', handler);
        });
        clickHandlers.clear();
    }

    function handleResize() {
        if (window.innerWidth > 1024) {
            initClickHandlers();
        } else {
            removeClickHandlers();
        }
    }

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트
    window.addEventListener('resize', handleResize);
})();
