document.addEventListener('DOMContentLoaded', function () {
    const foldBtn = document.querySelector('.fold_btn');
    const floatMenu = document.querySelector('.floatMenu_B');
    const topButton_b = document.querySelector('.moveToTop_module');

    if (!floatMenu) return;

    const savedState = localStorage.getItem('floatMenuFolded');
    const isFirstVisit = savedState === null;

    // 초기 상태 설정
    floatMenu.classList.add('no-transition');

    if (isFirstVisit) {
        // 첫 방문이면 펼침 상태로 보여주고 저장 안 함 (접을 때만 저장)
        floatMenu.classList.remove('is-folded');
    } else {
        const isFolded = savedState === 'true';
        if (isFolded) {
            floatMenu.classList.add('is-folded');
        } else {
            floatMenu.classList.remove('is-folded');
        }
    }

    // 트랜지션 다시 활성화
    requestAnimationFrame(() => {
        floatMenu.classList.remove('no-transition');
    });

    // 버튼 클릭 시 접힘 상태 토글 + 저장
    foldBtn?.addEventListener('click', () => {
        const folded = floatMenu.classList.toggle('is-folded');
        localStorage.setItem('floatMenuFolded', folded);
    });
});