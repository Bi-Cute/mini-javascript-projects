
const $wrapper = document.querySelector('#wrapper');

// const total = parseInt(prompt('카드 개수를 짝수로 입력하세요(최대 20).'));
const total = 8;

const colors = [
  'red', 'orange', 'yellow', 'green', 'white',
  'pink', 'cyan', 'violet', 'gray', 'black',
];
let colorSlice = colors.slice(0, total / 2);
let colorCopy = colorSlice.concat(colorSlice);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

function shuffle() {  // 피셔-예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i += 1) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    // 셔플 방법 1.
    // const spliced = colorCopy.splice(randomIndex, 1); 
    // shuffle.push(spliced[0]);
    // 셔플 방법 2.
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  // 카드 요소 & 클래스명 지정
  // div.card > div.card-inner > (div.card-front + div.card-back)
  const card = document.createElement('div');
  card.className = 'card';
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';

  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

  // clicked : [2, 5, 8, 9] 
  // 태스크큐: 
  // 백: addEventListener(12), 
function onClickCard() { 
  // 스프레드중 클릭 막기 or 완성된거 재클릭 막기 or 클릭한거 다시 클릭하는것 막기
  if (!clickable || completed.includes(this) || clicked[0] === this ) {
    return;
  }
  this.classList.toggle('flipped');
  clicked.push(this);
  if(clicked.length !== 2){
    return;
  }
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
  // 카드가 같다면
  if (firstBackColor === secondBackColor) { 
      completed.push(clicked[0]);
      completed.push(clicked[1]);
      clicked = [];
      // 아래와 같이 써도 됨
      // completed = completed.concat(clicked); 
      if (completed.length !== total) {
        return;
      }
      const endTime = new Date();
      setTimeout(() => {
      alert(`축하합니다! ${(endTime - startTime)/1000}초 걸렸습니다`);
      resetGame();
      },1000)
      return;
  } 
  clickable = false;
  // 카드가 다르다면
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
    clickable = true;
  }, 1000);
}

function startGame() {
  clickable = false; 
  shuffle();
  for (let i = 0; i < total; i += 1) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);

  // 카드 보여주기
  document.querySelectorAll('.card').forEach((card, index) => { 
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  // 카드 감추기
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
  });
  clickable = true;
  startTime = new Date();
}, 5000); // 감추기 시간
}
}

startGame();


function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colorSlice.concat(colorSlice);
  shuffled = [];
  completed = [];
  startGame();
}