//// 로또 추첨기
// 1부터 45개의 숫자 6개 뽑고
// 보너스 1개 뽑고


// 빈배열 45개 만들고 안에 언디파인드로 가득 채운 다음 맵을 통해 인덱스에 + 1 더하기
const canidate = Array(45).fill().map((v, i) => i + 1);

// 45개를 다 섞은 후, 앞에서 7개를 뽑아낸다

const shuffle = [];
    
while (canidate.length > 0) {
    const random = Math.floor(Math.random() * canidate.length); // 무작위 인덱스 뽑기
    const spliceArray = canidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
    const value = spliceArray[0] //배열에 들어있는 값을 꺼내어
    shuffle.push(value);
}
console.log(shuffle);

// 0번부터 5번까지 자른다 (0은 포함 6은 포함하지 않음)
// map과 slice의 특성은 잘러낸다고해도 원본이 변하지 않음
// sort(a-b는 오름차순) sort는 원본을 수정한다. 문자열 정렬은 a.localeCompare(b)
// slice()를 통해 원본을 복사 한 후 사용하면 원본을 반복하여 사용할 수 있다.S
const winBalls = shuffle.slice(0, 6).sort((a,b) => a - b); 
const bonus = shuffle[6];
console.log(winBalls, bonus);

const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');
const $reTry = document.querySelector('.reTry');

const showBall = (number, $target) => {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    $target.appendChild($ball);
    colorize(number, $ball)
}

for (let i=0;i < 6; i++){
    setTimeout(()=> {
        showBall(winBalls[i], $result);
    }, (i+1)*1000);
}
setTimeout(()=> {
    showBall(bonus, $bonus);
}, 7000);

setTimeout(() => {
    $reTry.classList.add('active')
} ,8000);


function colorize(number, $tag){
    if (number < 10) {
        $tag.style.backgroundColor = 'red';
    } else if (number < 20) {
        $tag.style.backgroundColor = 'orange';
    } else if (number < 30) {
        $tag.style.backgroundColor = 'yellow';
        $tag.style.color = 'black';
    } else if (number < 40) {
        $tag.style.backgroundColor = 'blue';
        $tag.style.color = 'white';
    } else {
        $tag.style.backgroundColor = 'green';
        $tag.style.color = 'white';
    }
}

// 새로고침


function reTry() {  
    location.reload();
}

$reTry.addEventListener('click',reTry);

