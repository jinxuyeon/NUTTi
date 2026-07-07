const prdList_F_a_tabCategory = document.querySelector(".product_list_F_a .tab_category");
const prdList_F_a_content = document.querySelectorAll(".product_list_F_a .content_box");
const prdList_F_a_selectBox = document.querySelector(".product_list_F_a #tab_select");

// 탭 & select 초기화
// prdList_F_a_content.forEach((box, index) => {
//     const moduleNameEl = box.querySelector(".module_title div");
//     const moduleName = moduleNameEl ? moduleNameEl.textContent.trim() : `탭 ${index + 1}`;

//     const li = document.createElement("li");
//     if (index === 0) li.classList.add("active");
//     const a = document.createElement("a");
//     a.href = "#";
//     a.textContent = moduleName;
//     li.appendChild(a);
//     prdList_F_a_tabCategory.appendChild(li);

//     const option = document.createElement("option");
//     option.value = index;
//     option.textContent = moduleName;
//     prdList_F_a_selectBox.appendChild(option);
// });

// 탭 클릭 이벤트 다시 연결
const prdList_F_a_tabItems = document.querySelectorAll(".product_list_F_a .tab_category li");

prdList_F_a_tabItems.forEach((tab, index) => {
    tab.addEventListener("click", function (e) {
        e.preventDefault();
        prdList_F_a_tabItems.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        prdList_F_a_content.forEach(c => c.classList.remove("active"));
        prdList_F_a_content[index].classList.add("active");

        prdList_F_a_selectBox.selectedIndex = index;
    });
});

// select 박스 변경 시 콘텐츠 전환
prdList_F_a_selectBox.addEventListener("change", function () {
    const selectedIndex = parseInt(this.value, 10);

    prdList_F_a_tabItems.forEach(t => t.classList.remove("active"));
    if (prdList_F_a_tabItems[selectedIndex]) {
        prdList_F_a_tabItems[selectedIndex].classList.add("active");
    }

    prdList_F_a_content.forEach(c => c.classList.remove("active"));
    if (prdList_F_a_content[selectedIndex]) {
        prdList_F_a_content[selectedIndex].classList.add("active");
    }
});