document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('#header');
    const body = document.querySelector('body');
    const menu = document.querySelectorAll('#header .top_category li');
    const gnbWrap = document.querySelector('#header .gnb_wrap');
    const aSearchBtn = document.querySelector('.eSearch');
    const moSearch = document.querySelector('.mo_search');
    const dimmed = document.querySelector('.dimmed');
    const searchBarForm = moSearch;

    const debounce = (func, delay) => { let timer; return () => { clearTimeout(timer); timer = setTimeout(func, delay); }; };

    const updateMoSearchTop = () => {
        if (!header || !searchBarForm) return;
        const headerBottom = header.getBoundingClientRect().bottom + window.scrollY;
        searchBarForm.style.top = `${headerBottom}px`;
    };

    const updateHeaderFixed = () => {
        const topBanners = document.querySelectorAll('.top_banner');
        let threshold = 1;
        topBanners.forEach(b => threshold += b.offsetHeight);
        header.classList.toggle('fixed', window.scrollY > threshold);
    };

    const updateAll = debounce(() => {
        updateMoSearchTop();
        updateHeaderFixed();
    }, 50);

    window.addEventListener('scroll', updateAll);
    window.addEventListener('resize', updateAll);

    updateMoSearchTop();
    updateHeaderFixed();

    if (aSearchBtn && moSearch && dimmed) {
        aSearchBtn.addEventListener('click', e => {
            e.preventDefault();
            moSearch.classList.add('active');
            dimmed.classList.add('active');
            body.classList.add('searchExpand');
        });
        dimmed.addEventListener('click', () => {
            moSearch.classList.remove('active');
            dimmed.classList.remove('active');
            body.classList.remove('searchExpand');
        });
    }

    const openGnb = () => {
        gnbWrap.classList.add('active');
        const gnbInner = gnbWrap.querySelector('.inner');
        if (!gnbInner?.querySelector('.depth01')) return;

        setTimeout(() => {
            gnbWrap.style.height = gnbInner.scrollHeight + 'px';
        }, 200);
    };

    const closeGnb = () => {
        gnbWrap.classList.remove('active');

        setTimeout(() => {
            gnbWrap.style.height = '0px';
            gnbWrap.querySelectorAll('.depth02 > li.active, .depth03 > li.active, .depth04 > li.active').forEach(li => li.classList.remove('active'));
        }, 200);
    };

    menu.forEach(item => {
        item.addEventListener('mouseenter', openGnb);
        item.addEventListener('mouseleave', closeGnb);
    });
    gnbWrap.addEventListener('mouseenter', openGnb);
    gnbWrap.addEventListener('mouseleave', closeGnb);

    // 아이콘 클릭 시 depth 제어
    gnbWrap.addEventListener('click', function (e) {
        const icon = e.target.closest('.iconArrowBottom, i[class*="icoArrowBottom"]');
        if (!icon) return;

        const li = icon.closest('li');
        if (!li) return;

        e.preventDefault();

        const subDepth = li.querySelector('ul');
        if (!subDepth) return;

        li.parentElement.querySelectorAll(':scope > li').forEach(sibling => {
            if (sibling !== li) {
                sibling.classList.remove('active');
                sibling.querySelectorAll('li').forEach(subLi => subLi.classList.remove('active'));
            }
        });

        li.classList.toggle('active');
        openGnb();
    });
});