(function () {
    // 1024px 초과(데스크톱)에서만 상품 아이템 클릭 처리
    var clickHandlers = new Map();

    function initClickHandlers() {
        document.querySelectorAll('.product_list_A_a_a .prdList__item').forEach(function (item) {
            if (clickHandlers.has(item)) return;

            item.style.cursor = 'pointer';

            var handler = function (e) {
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
        clickHandlers.forEach(function (handler, item) {
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