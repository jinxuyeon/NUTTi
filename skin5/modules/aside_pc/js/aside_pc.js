const asidePCA = document.querySelector('#aside.aside_pc_A');
if (asidePCA) {
    let isHidden = false;
    let parent = asidePCA.parentElement;

    while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.display === 'none') {
            isHidden = true;
            break;
        }
        parent = parent.parentElement;
    }

    if (!isHidden) {
        // 스타일 적용
        const style = document.createElement('style');
        style.textContent = `
        body.expand { overflow: hidden; }
        body.expand #aside.aside_pc_A { left: 0; visibility: visible; }
        body.expand #header { z-index: 99; }
        .dimmed { z-index: 999; }
        `;
        asidePCA.appendChild(style);

        // 메뉴바 닫기
        const btnNavs = document.querySelectorAll('#aside .btnClose');
        btnNavs.forEach( function(btnNav) {
            btnNav.addEventListener('click', function(){
                if (document.body.classList.contains('expand')) {
                    document.body.classList.remove('expand');
                } else {
                    document.body.classList.add('expand');
                }
            });
        });

        // 메뉴바 카테고리 클릭 이벤트
        function handleToggleActive(currentList, otherList = []) {
            return function (event) {
                const current = event.currentTarget;

                // 현재 리스트에서 selected 제거
                currentList.forEach(el => {
                    if (el.classList.contains('selected') && el !== current) {
                        el.closest('li').classList.remove('selected');
                    }
                });

                // 다른 리스트에서도 selected 제거
                otherList.forEach(list => {
                    list.forEach(el => el.closest('li').classList.remove('selected'));
                });

                const list = current.closest('li');
                //if (list) list.classList.toggle('selected');
            };
        }

        document.addEventListener('DOMContentLoaded', function () {
            const topCategory = document.querySelector('#aside .top_category');

            if (!topCategory) return;

            topCategory.addEventListener('click', function (e) {
                console.log('e.target =',e.target);
                const list = e.target.siblings('.view');
                console.log('list =',list);
                const parentLi = list.closest('li');

                console.log('parentLi =',parentLi);

                if (!list) return;

                if (parentLi && Array.from(parentLi.children).some(child => child.tagName === 'UL')) {
                    e.preventDefault();
                }

                const subCate01View = document.querySelectorAll('.top_category > ul > li:not(.xans-record-) > .view');

                if (list.matches('ul > li > .view')) {
                    handleToggleActive(subCate01View)(e);
                }
            });
        });
    }
}