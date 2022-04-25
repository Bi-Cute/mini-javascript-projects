//// 01. 참가자 인원수 체크
const number = parseInt(prompt('몇명이 참가하나요?', "숫자만 입력해주세요"), 10)

// const number = 5  테스트용 인원수
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');

// 제시어
let word;
// 새로 입력한 단어
let newWord;

// 유저 순서 카운터 함수
function playerCount() {
    let order = Number($order.textContent); //현재 순서
    if (order + 1 > number) {
        $order.textContent = 1;
    } else {
        $order.textContent = order + 1;
    }
}

// 입력시 제시어가 비어있을 경우
function wordChange() {
    word = newWord; // 입력한 단어가 제시어가 된다.
    $word.textContent = word;
    $input.value = '';
    $input.focus();
}

//// 03. 인풋창 이벤트
const onInput = (event) => {
    newWord = event.target.value;
};

const $input = document.querySelector('input');
$input.addEventListener('input', onInput);

//// 04. 버튼 클릭 이벤트
const onClickButton = () => {
    //제시어가 비어 있는가?
    if (!word) {
        // 비어 있을 경우
        wordChange();
        playerCount();

        // 비어있지 않을 경우
    } else {

        // 마지막 글자와 새로운 글자의 첫번째가 같은가
        if (word[word.length - 1] === newWord[0]) {

            // 같다면
            wordChange();
            playerCount();

            // 같지 않다면
        } else {

            alert("잘못 입력하였습니다")
            $input.value = '';
            $input.focus();
        }
    }
}

const $button = document.querySelector('button');
$button.addEventListener('click', onClickButton);

$input.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        if (!word) {
            wordChange();
            playerCount();
        } else {
            if (word[word.length - 1] === newWord[0]) {
                wordChange();
                playerCount();
            } else {
                alert("잘못 입력하였습니다")
                $input.value = '';
                $input.focus();
            }
        }
    }
})
