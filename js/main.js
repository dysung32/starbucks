const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus(); // search(돋보기) 요소 클릭 시 input 요소 focus됨
});

searchInputEl.addEventListener('focus', function() { // input 요소가 foucs되면 
  searchEl.classList.add('focused'); // search 요소에 'focused'라는 class를 추가
  searchInputEl.setAttribute('placeholder', '통합검색'); // '통합검색'이라는 placeholder 삽입
});

searchInputEl.addEventListener('blur', function() { // input 요소가 blur(focus가 해제)되면
  searchEl.classList.remove('focused'); // search 요소에 'focused'라는 class를 삭제
  searchInputEl.setAttribute('placeholder', ''); // placeholder 비움
});


const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top'); // SCROLL TO TOP 부분에 활용

window.addEventListener('scroll', _.throttle(function() { // lodash 라이브러리 활용(throttle 메소드)
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, { // 0.6 sec에 걸쳐서
      opacity: 0, // 투명도가 점점 낮아짐
      display: 'none'
    });
    // TOP 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0 // 원래 위치
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, { // 0.6 sec에 걸쳐서
      opacity: 1, // 투명도가 점점 높아짐
      display: 'block'
    });
    // TOP 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100 // 오른쪽으로 100px 만큼 이동(숨기기)
    });
  }
}, 300));
// _.throttle(함수, 시간(ms))
// scroll 함수 0.3sec 단위로 부활 -> 함수가 한번에 많은 양이 실행되는 걸 방지.

// SCROLL TO TOP 구현
// ScrollToPlugin 활용

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


// 시간 차를 두고 section visual img 나타내기
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 애니메이션 딜레이 넣기(0.7, 1.4, 2.1, 2.7)
    opacity: 1
  });
});


// swiper 라이브러리 활용
// new Swiper(CSS 선택자, 옵션)
// notice(공지사항) swiper
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // swiper 방향: 수직
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
});

// promotion(프로모션) swiper
new Swiper('.promotion .swiper-container', {
  direction: 'horizontal', // 기본값이 horizontal(수평)이라 명시해주지 않아도 됨.
  slidesPerView: 3, // 한번에 보여줄 슬라이드 갯수
  spaceBetween: 10, // 슬라이드 사이 여백(px)
  centeredSlides: true, // 보여지는 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 // 5초
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});


// AWARDS swiper
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5, // 하나의 화면에 보여줄 slide 갯수
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


// PROMOTION toggle
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) { // isHidePromotion이 true라면
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else { // isHidePromotion이 false라면
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});


// floating 애니메이션
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), { // random 함숫값을 애니메이션 동작 시간으로 활용
    // 옵션
    y: size, // y축
    repeat: -1, // -1은 무한반복을 의미
    yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생
    ease: Power1.easeInOut, // gsap easing 사이트 참고
    delay: random(0, delay)
  });
}
// floatingObject 함수 호출
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// ScrollMagic 애니메이션
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({ // 제어하려고 하는 섹션들 감시할 때 필요한 옵션들 지정 함수
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // viewport에 상대적으로 어느 시점에서 보여줄 건지 설정
    })
    .setClassToggle(spyEl, 'show') // HTML class를 넣었다 뺐다 제어하는 기능
    .addTo(new ScrollMagic.Controller()); // addTo(): ScrollMagic 라이브러리에 필요한 컨트롤러 내용을 추가하기 위한 함수
});



// 올해 연도 구하기
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2022