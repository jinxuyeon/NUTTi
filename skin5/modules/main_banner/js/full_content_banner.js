// 기존 Swiper 인스턴스 찾기 또는 새로 생성
let visual_swiper;

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function () {
    // 실제 HTML 구조에 맞는 셀렉터
    const swiperElement = document.querySelector('.main_section.swiper');

    if (swiperElement && swiperElement.swiper) {
        // 기존 인스턴스 사용
        visual_swiper = swiperElement.swiper;
        console.log('기존 Swiper 인스턴스 발견');
    } else {
        // 새로운 인스턴스 생성
        visual_swiper = new Swiper('.main_section.swiper', {
            slidesPerView: 1,
            speed: 800,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            mousewheel: {
                enabled: true,
                sensitivity: 1,
            },
        });
        console.log('새로운 Swiper 인스턴스 생성');
    }

    // 이벤트 리스너 추가
    setupSlideTracking();
});

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
    const slides = document.querySelectorAll('.main_section.swiper .swiper-slide');
    slides.forEach((slide, index) => {
        const textBox = slide.querySelector('.text_box');
        const deviceType = getDeviceType();
        const textColor = deviceType === 'Mobile' ? mobileTextColorSettings : textColorSettings;
        
        // aria-label에서 슬라이드 번호 추출 (예: "2 / 4" -> 1 (0-based index))
        const ariaLabel = slide.getAttribute('aria-label');
        let slideDataIndex = index; // 기본값으로 배열 인덱스 사용
        
        if (ariaLabel) {
            const slideNumber = parseInt(ariaLabel.split(' / ')[0]);
            slideDataIndex = slideNumber - 1; // 1-based to 0-based
        }
        
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

// 슬라이드 추적 설정 함수
function setupSlideTracking() {
    if (!visual_swiper) {
        return;
    }

    // 슬라이드 변경 시마다 현재 li 정보 출력 및 텍스트 색상 업데이트
    visual_swiper.on('slideChange', function () {
        // 텍스트 색상 업데이트
        updateTextColor(this.realIndex);
    });

    // 초기 텍스트 색상 설정 및 슬라이드 정보 출력
    setTimeout(() => {
        // 초기 텍스트 색상 설정
        updateTextColor(visual_swiper.realIndex);
    }, 100);
}

// 화면 크기 변경 시 디바이스 타입 변화 감지 및 텍스트 색상 업데이트
window.addEventListener('resize', function() {
    const newDeviceType = getDeviceType();
    
    // 디바이스 타입이 변경된 경우에만 텍스트 색상 업데이트 실행
    if (newDeviceType !== currentDeviceType && visual_swiper) {
        currentDeviceType = newDeviceType;
        updateTextColor(visual_swiper.realIndex);
    }
});
