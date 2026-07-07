document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('.main_content.content_C_b ul .content_box');
    const moreBtn = document.querySelector('.main_content.content_C_b .btnMore');
    const count = document.querySelector('.main_content.content_C_b .more .count');

    const ITEMS_TO_SHOW = 3;
    let currentIndex = 0;

    const totalPages = Math.ceil(listItems.length / ITEMS_TO_SHOW);
    let currentPage = 1;

    function content_C_b_Items() {
        listItems.forEach((item, index) => {
            item.style.display = (index < currentIndex) ? 'block' : 'none';
        });

        count.textContent = `(${currentPage}/${totalPages})`;

        if (currentIndex >= listItems.length) {
            moreBtn.style.display = 'none';
        }
    }

    // 초기 설정
    currentIndex = ITEMS_TO_SHOW;
    content_C_b_Items();

    moreBtn.addEventListener('click', function () {
        currentIndex += ITEMS_TO_SHOW;
        currentPage = Math.min(currentPage + 1, totalPages);
        content_C_b_Items();
    });

    // 3개 이하 시 버튼 숨김
    if (listItems.length <= ITEMS_TO_SHOW) {
        moreBtn.style.display = 'none';
    }
});