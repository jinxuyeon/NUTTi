// 메인 비주얼 슬라이드
const visual_A_a = new Swiper('.visual_A_a', {
    slidesPerView: 'auto',
    speed: 800,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"><span class="progress-bar"></span></span>`;
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

/*
수동추가
디바이스에 따라서 배너 텍스트 색상 변경하기 위해서 색상 변경 로직 추가
["", "", ""], ["", "", ""] 코드상 치환
*/
// 디바이스 타입 감지 함수 (CSS @container 767px 기준)
function getDeviceType() {
    return window.innerWidth <= 767 ? 'Mobile' : 'PC';
}

// 현재 디바이스 타입 추적 변수
let currentDeviceType = getDeviceType();

// 슬라이드별 텍스트 색상 설정 배열
const textColorSettings = ["", "", ""];
const mobileTextColorSettings = ["", "", ""];

// 텍스트 색상 클래스 업데이트 함수
function updateTextColor(slideIndex) {
    const slides = document.querySelectorAll('.visual_A_a .swiper-slide');
    slides.forEach((slide) => {
        const textBox = slide.querySelector('.text_box');
        const deviceType = getDeviceType();
        const textColor = deviceType === 'Mobile' ? mobileTextColorSettings : textColorSettings;
        const slideDataIndex = parseInt(slide.getAttribute('data-swiper-slide-index'));

        if (textBox && slideDataIndex === slideIndex) {
            // 기존 text_btn_white 클래스 제거
            textBox.classList.remove('text_btn_white');
            // 해당 슬라이드가 현재 슬라이드이고 설정이 white인 경우 클래스 추가
            if (textColor[slideDataIndex] === 'white') {
                textBox.classList.add('text_btn_white');
            }
        }
    });
}

// 슬라이드 이동 시마다 현재 슬라이드 번호 추적 및 텍스트 색상 업데이트
visual_A_a.on('slideChange', function() {
    // 텍스트 색상 업데이트
    updateTextColor(this.realIndex);
});

// 초기 텍스트 색상 설정
updateTextColor(visual_A_a.realIndex);

// 화면 크기 변경 시 디바이스 타입 변화 감지 및 텍스트 색상 업데이트
window.addEventListener('resize', function() {
    const newDeviceType = getDeviceType();

    // 디바이스 타입이 변경된 경우에만 텍스트 색상 업데이트 실행
    if (newDeviceType !== currentDeviceType) {
        currentDeviceType = newDeviceType;
        updateTextColor(visual_A_a.realIndex);
    }
});