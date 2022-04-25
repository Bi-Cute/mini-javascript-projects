


const $TicTacToe = document.querySelector('.TicTacToe');
// (03) 
// (02)
// 구조분해 할당 방식
const { body } = document;
// const body = document.body;
const $table = document.createElement('table');
const $result = document.createElement('div');
$result.className = 'result';
const rows = [];
let turn = '○';

// [
//  [td, td, td]],
//  [td, td, td]],
//  [td, td, td]],
// ]

// 다시하기
const $reTry = document.querySelector('.reTry');
function reTry() {  
    location.reload();
}
$reTry.addEventListener('click',reTry);

// 승리 조건 체크

    // const checkWinner = (target) => {
    //     let rowIndex;
    //     let cellIndex;
    //     // 인덱스 번호를 알수 있는 forEach
    //         rows.forEach((row, ri) => {
    //         row.forEach((cell, ci) => {
    //             if (cell === target) {
    //                 rowIndex = ri;
    //                 cellIndex = ci;
    //             }
    //         });
    //     });

    const checkWinner = (target) => {
        // td는 자체적으로 cellIndex를 가지고 있음.
    const cellIndex = target.cellIndex;
    // 로우인덱스는 tr이 가지고 있음. td의 부모태그(tr)의 로우인덱스를 가져온다.
    let rowIndex = target.parentNode.rowIndex;
    // parentNode = 그 태그의 부모요소를 가져오는 방법.

    // 세 칸이 다 채워졌는가?
    let hasWinner = false;
    // 가로줄 검사
    if ( 
        rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn &&
        rows[rowIndex][2].textContent === turn 
        ) {
            hasWinner = true;
        }
    //  세로줄 검사
    if (
        rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn
    ) {
        hasWinner = true;
    }
    // 대각선 체크
    if (
        rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn
    ) { 
        hasWinner = true;
    }
    if (
        rows[2][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[0][2].textContent === turn
    ) {
        hasWinner = true;
    }
    return hasWinner;
};

// (01) 
// const data = [[], [], []];
// for (let i = 0; i < 3; i++) {
//     rows.push([]);
// }



// (04) 반복문과 내용 따로 분류하기
const checkWinnerAndDraw = (target) => {
    const hasWinner = checkWinner(target);
    // 승자가 있으면
    if (hasWinner) {
        $result.textContent = `${turn}님이 승리!`;
        $table.removeEventListener('click', callback);
        return;
    }
    // 승자가 없으면
    const draw = rows.flat().every((cell) => cell.textContent);
    if (draw) {
        $result.textContent = `무승부`;
        return;
    }
    turn = turn === 'X' ? 'O' : 'X';
};


                // // setTime out 버그 수정 (플래그)
                // let clickable = true;

                // const callback = (event) => {
                        // 이벤트 버블링 막기 (반대로 부모 클릭시 자식에게 퍼지는건 캡쳐링. )
                        // 캡쳐링은 useCapture 를 true로 달아줘야 기동함. 팝업 닫기등에 사용
                        // 칸에 글자가 있는지 확인 - 칸에 컨텐츠가 있으면 액션 멈추기

                //     // 클릭커블이 false 일 경우 중단
                //     if (!clickable) {
                //         return;
                //     }

                //     // 타겟이 비어있지 않을 경우 중단
                //     if (event.target.textContent !== '') {
                //         console.log('빈칸이 아닙니다.');
                //         return;
                //     }

                //     // 타겟이 비어있을 경우 텍스트 추가.
                //     console.log('빈칸입니다');
                //     event.target.textContent = turn;    

                //     // 승리 조건 체크
                //     // if (checkWinner(event.target)) {
                //     //     $result.textContent = `${turn}님의 승리!`
                //     //     $table.removeEventListener('click', callback);
                //     //     $reTry.classList.add('active');
                //     //     return;
                //     // };
                    

                    // 무승부 검사 1 - 모든 칸을 검사해야하기때문에 비효율적
                    // let draw = true;
                    // rows.forEach((row) => {
                    //     row.forEach((cell) => {
                    //         if (!cell.textContent) {
                    //             draw = false;
                    //         }
                    //     });
                    // });

                            // every는 모두가 true라야 하며, 하나라도 실패하면 false가 됨
                            // every는 1차원 배열에서만 사용 가능.
                            // flat매서드로 2차원 배열을 1차원 배열로 만들어줌
                            // some = 하나라도 칸이 차 있을때 true 
                //     // // 무승부 조건 체크
                //     // const draw = rows.flat().every((cell) => cell.textContent);    
                //     // if (draw) {
                //     //     $result.textContent = `무승부 입니다`
                //     //     $reTry.classList.add('active');
                //     //     return;
                //     // }
                //     // 순서 교대
                //     // turn = (turn ==='○' ? '✕' : '○');

                //     // 승부 결과 판단
                //     checkWinnerAndDraw(event.target);
                    
                    
                //     if (turn === '✕') {
                //         const emptyCells = rows.flat().filter((v) => !v.textContent);
                //         const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                //         clickable = false;
                //     setTimeout(() => { 
                //     // CPU의 턴일 경우
                //         randomCell.textContent = '✕';
                //         checkWinnerAndDraw(randomCell);
                        
                //         // // CPU의 승리조건 체크
                //         // if (hasWinner) {
                //         //     $result.textContent = `${turn}님이 승리`;
                //         //     $table.removeEventListener('click', callback);
                //         //     $reTry.classList.add('active');
                //         //     return;
                //         // }
                        
                //         // // CPU의 무승부 조건 체크
                //         // const draw = rows.flat().every((cell) => cell.textContent);
                //         // if (draw) {
                //         //     $result.textContent = `무승부`;
                //         //     $reTry.classList.add('active');
                //         //     return;
                //         // }

                //         // // 순서 교대
                //         // turn = (turn ==='○' ? '✕' : '○');

                        
                //         clickable = true;
                //     },1000);
                // }
                // }; 

let clickable = true;
const callback = (event) => {
    if (!clickable) {
    return;
}
  if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
    console.log('빈칸이 아닙니다.');
    return;
}
  // 빈칸이면
    console.log('빈칸입니다');
    event.target.textContent = turn;
  // 승부 판단하기
    checkWinnerAndDraw(event.target);
    if (turn === 'X') {
    const emptyCells = rows.flat().filter((v) => !v.textContent);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    clickable = false;
    setTimeout(() => {
        randomCell.textContent = 'X';
        checkWinnerAndDraw(randomCell);
        clickable = true;
    }, 1000);
    }
};


for (let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    for (let j = 0; j < 3; j++) {
        const $td = document.createElement('td'); 
        cells.push($td);
        // $td.addEventListener('click', callback);
        $tr.append($td);
    }
    rows.push(cells);
    $table.append($tr);
}

// 이벤트 버블링을 이용
$table.addEventListener('click', callback);


$TicTacToe.append($table);
$TicTacToe.append($result);






