// 검색 부분
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


// 올해 연도 구하기
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2022