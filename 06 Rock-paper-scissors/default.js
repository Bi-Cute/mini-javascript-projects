const $computer = document.querySelector('#computer');
const $myScore = document.querySelector('#myScore');
const $computerScore = document.querySelector('#computerScore');
const $scissors = document.querySelector('#scissors');
const $rock = document.querySelector('#rock');
const $paper = document.querySelector('#paper');

const IMG_URL = './rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`;
// $computer.style.background = `url(${IMG_URL}) -220 0`;
// $computer.style.background = `url(${IMG_URL}) -440 0`;
$computer.style.backgroundSize = `auto 200px`;

/* 
여러개의 객체의 공통점(가위바위보 파일의 좌표)을 모으면 객체를 만드는것이 좋다 (그룹화)
$computer.style.backgroundSize = 'auto 200px';
const scissorX = '-0';
const rockX = '-220px';
const paperX = '-440px';
*/

/*
변수명은 고유한것으로 사용하는것이 좋다. 
다음과 같은경우 그룹화 하는것이 좋다.
const name = 'bicue';
const name = '전덕진';
    가 아닌 
const bicute = {
    name: '비큐트';
}
const JDJ = {
    name: '전덕진'
}
*/

const rpsX = {
    scissors: '0',
    rock: '-220px',
    paper: '-440px',
}

// coord = coordinate 좌표 함수 변화 (1)
// let coord = '0';
// setInterval(()=>{ 
//     if (coord === rpsX.scissors) { // 가위면
//         coord = rpsX.rock;
//     $computer.style.background = `url(${IMG_URL}) ${rpsX.rock} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     } else if (coord === rpsX.rock) { // 바위면
//         coord = rpsX.paper;
//     $computer.style.background = `url(${IMG_URL}) ${rpsX.paper} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     } else if (coord === rpsX.paper) {
//         coord = rpsX.scissors; //보f라면
//     $computer.style.background = `url(${IMG_URL}) ${rpsX.scissors} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     }
// },80);


// coord = coordinate 좌표 함수 변화 (2) 변수명 알기쉽게
// let computerChoice = 'scissors';
// setInterval(()=>{ 
//     if (computerChoice === 'scissors') { // 가위면
//         computerChoice = 'rock';
//     $computer.style.background = `url(${IMG_URL}) ${rpsX.rock} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     } else if (computerChoice === 'rock') { // 바위면
//         computerChoice = 'paper';
//     $computer.style.background = `url(${IMG_URL}) ${rpsX.paper} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     } else if (computerChoice === 'paper') {
//         computerChoice = 'scissors'; //보f라면
//     $computer.style.background = `url(${IMG_URL}) ${rpsX.scissors} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     }
// },80);


const $reTry = document.querySelector('.reTry');
// 새로고침
function reTry() {  
    location.reload();
}
$reTry.addEventListener('click',reTry);


// coord = coordinate 좌표 함수 변화 (3) 중복제거 > 행동을 함수로 정의
let computerChoice = 'scissors';
let changeComputerHand = () => { 
    if (computerChoice === 'scissors') { // 가위면
        computerChoice = 'rock';
    } else if (computerChoice === 'rock') { // 바위면
        computerChoice = 'paper';
    } else if (computerChoice === 'paper') {
        computerChoice = 'scissors'; //보f라면 
    }
    $computer.style.background = `url(${IMG_URL}) ${rpsX[computerChoice]} 0`;
    $computer.style.backgroundSize = `auto 200px`;
}
// (5) 버그 수정 > (6) 점수 계산
let intervalId = setInterval(changeComputerHand, 80);
let clickable = true;  // 버그 수정방법3. 플래그 변수( 참 거짓 변수)를 만들어 참일때만 작동하도록
let myScore = 0; // 점수 표시
let computerScore = 0;
const clickButton = () => {
    if (clickable) {
        clearInterval(intervalId);
        clickable = false;
        // 점수 계산 및 화면 표시
        // const myChoice = event.target.textContent === '바위'
        //     ? 'rock' : event.target.textContent === '가위'
        //         ? 'scisors'
        //             : 'paper';
        const myChoice = event.target.id;
        let message = '';

        if(myChoice !== computerChoice) {
            if(myChoice === 'scissors') {
                if(computerChoice === 'paper') {
                    message = '승리';
                    myScore += 1;
                } else { 
                    message = '패배';
                    computerScore += 1;
                }
            };
            if(myChoice === 'rock') {
                if(computerChoice === 'scissors') {
                    message = '승리';
                    myScore += 1;
                } else { 
                    message = '패배';
                    computerScore += 1;
                }
            };
            if(myChoice === 'paper') {
                if(computerChoice === 'rock') {
                    message = '승리';
                    myScore += 1;
                } else { 
                    message = '패배';
                    computerScore += 1;
                }
            };
        }
        
        // 결과 출력
        // 5판 3선승제
        if(myScore >= 3) {
            $myScore.textContent = `당신의 승리입니다.`;
            $computerScore.textContent = '';
        } else if ( computerScore >= 3) {
            $myScore.textContent = `당신의 패배입니다.`
            $computerScore.textContent = '';
        } else {
            $myScore.textContent = `나의 점수: ${myScore} 점`;
            $computerScore.textContent = `컴퓨터의 점수 : ${computerScore} 점`;
        };

            // $rock.removeEventListener('click', clickButton); // 버그 수정 방법 2. 버튼 잠금 removeEventListener
            // $scissors.removeEventListener('click', clickButton);
            // $paper.removeEventListener('click', clickButton);
        // 점수 계산 및 화면 표시
        setTimeout(() => {
            clickable = true;
            // clearInterval(intervalId); // 버그 수정 방법 1. 비동기 
            intervalId = setInterval(changeComputerHand, 80);
            // 게임 종료 옵션
            if(computerScore >= 3 || myScore >= 3) {
                clearInterval(intervalId);
                $reTry.classList.add('active');
            }
            // $rock.addEventListener('click', clickButton); 
            // $scissors.addEventListener('click', clickButton);
            // $paper.addEventListener('click', clickButton);
        }, 1000); // 1초후 다시 시작
    };
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);


// setInterval(changeComputerHand, 80);

// coord = coordinate 좌표 함수 변화 (4) 셋 인터벌은 셋 타임아웃으로 가능. 
// 함수안에서 자기 이름을 다시 호출하는 함수 = 재귀함수
// let computerChoice = 'scissors';
// let changeComputerHand = () => { 
//     if (computerChoice === 'scissors') { // 가위면
//         computerChoice = 'rock';
//     } else if (computerChoice === 'rock') { // 바위면
//         computerChoice = 'paper';
//     } else if (computerChoice === 'paper') {
//         computerChoice = 'scissors'; //보f라면
//     }
//     $computer.style.background = `url(${IMG_URL}) ${rpsX[computerChoice]} 0`;
//     $computer.style.backgroundSize = `auto 200px`;
//     setTimeout(changeComputerHand, 80);
// }
// setTimeout(changeComputerHand, 80);


// [ 버그 ] : clickButton 5번 호출 : 1번 인터벌, 2번, 3번, 4번, 5번
// intervalId에는 변수가 하나기 때문에 계속 덮어써서 5번만 intervalId에 저장됨.
// 그다음 버튼을 클릭하면 5번만 취소, 취소 안되는 인터벌이 계속 누적됨.
// clearInterval(intervalId);를 한번 더 주거나
// 잠시동안 버튼 클릭 못하게 만드는 방법도 있음. 
// 변수를 















