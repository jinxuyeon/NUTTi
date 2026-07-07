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
        const bannerAction = document.querySelector(".mo #banner_action");
        const btnSearch = document.querySelector(".mo .xans-layout-searchheader input");
        const searchValue = document.querySelector(".mo .xans-layout-searchheader #keyword").value;
        let bannerValue = bannerAction ? bannerAction.value : "";
        
        if (window.innerWidth <= 1024 && bannerAction) {
            bannerAction.value = "";
            
            if (btnSearch && bannerValue) {
                btnSearch.addEventListener("click", function () {
                    const newValue = document.querySelector(".mo .xans-layout-searchheader #keyword").value;
                    if(searchValue === newValue){
                        window.location.href = bannerValue;
                    }
                });
            }
        }
    }, 300);
});

// 배너 text_btn_white 클래스 감지 및 body 클래스 업데이트
(function() {
    // body 클래스 업데이트 함수
    function updateBodyClassByBanner() {
        // 현재 활성화된 슬라이드의 text_box 찾기
        const activeSlide = document.querySelector('.visual_A_a .swiper-slide-active');

        if (activeSlide) {
            const textBox = activeSlide.querySelector('.text_box');
            const hasWhiteText = textBox && textBox.classList.contains('text_btn_white');

            // body 클래스 업데이트
            if (hasWhiteText) {
                document.body.classList.add('white_color');
            } else {
                document.body.classList.remove('white_color');
            }
        }
    }

    // Swiper 인스턴스가 생성될 때까지 대기
    function initBannerObserver() {
        // Swiper가 이미 초기화되었는지 확인
        const swiperContainer = document.querySelector('.visual_A_a');

        if (swiperContainer && swiperContainer.swiper) {
            // Swiper가 이미 초기화되어 있으면 바로 설정
            setupSwiperObserver(swiperContainer.swiper);
        } else {
            // Swiper 초기화를 기다림
            const checkInterval = setInterval(function() {
                const container = document.querySelector('.visual_A_a');
                if (container && container.swiper) {
                    clearInterval(checkInterval);
                    setupSwiperObserver(container.swiper);
                }
            }, 100);

            // 5초 후에도 찾지 못하면 중단
            setTimeout(function() {
                clearInterval(checkInterval);
            }, 5000);
        }
    }

    // Swiper 이벤트 리스너 설정
    function setupSwiperObserver(swiper) {
        // 초기 로드 시 체크
        updateBodyClassByBanner();

        // 슬라이드 변경 시 체크
        swiper.on('slideChange', function() {
            updateBodyClassByBanner();
        });

        // MutationObserver로 text_btn_white 클래스 변경 감지
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('text_box')) {
                        updateBodyClassByBanner();
                    }
                }
            });
        });

        // 모든 text_box 요소 관찰
        const textBoxes = document.querySelectorAll('.visual_A_a .text_box');
        textBoxes.forEach(function(textBox) {
            observer.observe(textBox, {
                attributes: true,
                attributeFilter: ['class']
            });
        });
    }

    // DOM이 준비되면 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBannerObserver);
    } else {
        initBannerObserver();
    }
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