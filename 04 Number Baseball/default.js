const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');
const $reTry = document.querySelector('.reTry')
let out = 0;

// 01 
const numbers = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let n = 0; n < 9; n += 1) {
        numbers.push(n+1);
    }

// 02 중복되지 않게 숫자를 하나씩 가져오기
const answer = [];
for (let n = 0; n <=3; n += 1 ) { // 4번 반복
    // const index = Math.floor(Math.random() * (9 - n));  
    const index = Math.floor(Math.random() * (numbers.length));  // 0~8 랜덤(idx)
    // 숫자를 빼주고
    answer.push(numbers[index]);
    // 빼낸 숫자는 지워주고
    numbers.splice(index, 1);
}
console.log(answer);


const tries =[];
function checkInput(input){
    
    if(input.length !== 4) { // 숫자의 길이 확인
        return alert ('4자리 숫자를 입력해 주세요.');
    }
    if(new Set(input).size !== 4) { //중복된 숫자 확인
        return alert('중복되지 않게 입력해 주세요.')
    }
    if(tries.includes(input)) { // 이미 시도한 값은 아닌가
        return alert ('이미 시도한 값입니다.')
    }
    return true;
} // 검사하는 코드

function defeated() { 
    $logs.appendChild(document.createTextNode(`패배! 정답은 ${answer.join('')} 입니다 `));
    $reTry.classList.add('active');
}

$form.addEventListener('submit',(event) => {
event.preventDefault(); // 기본 동작 막기 (막지 않으면 새로고침됨 (폼태그/a태그 등))
const value = $input.value;
$input.value = '';
const valid = checkInput(value);
if(!valid) return;

    // 위에서 true가 들어올 경우 = 입력값 문제없음
    if (answer.join('') === value) { // 배열을 문자열로 바꾸는 매서드
        $logs.textContent = '홈런! 정답입니다.';
        $reTry.classList.add('active');
        return;
    }

    if (tries.length >= 9) {
        defeated();
        return;
    }
    // 몇 스르트라이크 몇 볼인지 검사

    let strike = 0;
    let ball = 0;
    // (택1) for문으로 사용할 경우
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if(index > -1) { // 일치하는 숫자 발견
            if (index === i) { // 자리수도 같음
                strike += 1;
            } else { // 숫자만 같음
                ball += 1;
            }
        }
    }

    
    // (택1) forEach로 사용할 경우
    // answer.forEach((element, i) => {
    //     const index = value.indexOf(element);
    //     if(index > -1) { // 일치하는 숫자 발견
    //         if (index === i) { // 자리수도 같음
    //             strike += 1;
    //         } else { // 숫자만 같음
    //             ball += 1;
    //         }
    //     }
    // })


    if (strike === 0 && ball === 0) {
        out++;
        let pTag = document.createElement('p');
        pTag.textContent = `${value} = ${out} 아웃`;
        $logs.appendChild(pTag)

        // $logs.append(`${value} 아웃`, document.createElement('br'));
    } else {

    // 문자열과 br태그 함께 추가 
    let pTag2 = document.createElement('p');
    // let pTag = document.createElement('p');
    pTag2.textContent = `${value} = ${strike}스트라이크, ${ball}볼`;
    $logs.appendChild(pTag2)
    // $logs.append(`${value} = ${strike}스트라이크, ${ball}볼`, document.createElement('br'));
}

// 아웃이 3개가 모일 경우
if(out === 3) {
    defeated();
    return;
}

    
    tries.push(value);
});

// 새로고침
function reTry() {  
    location.reload();
}

