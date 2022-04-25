const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');
const $average = document.querySelector('#average');



// 변수선언 (블록 스코프라 안쪽에서 선언하면 안됨)
let startTime;
let endTime;
const records =[];
let timeOutId;
    $screen.addEventListener('click', (event) => {
        console.log(event);
        // Ready 단계
        if (event.target.classList.contains('ready')) {
            $screen.classList.remove('ready');
            $screen.classList.add('set');
            $screen.textContent='클릭 준비!';
            // 이벤트 리스너 등 타이머가 걸리면 항상 타이머 제거도 마련해줄것.
            timeOutId = setTimeout(function() { 
                startTime = new Date();
                $screen.classList.remove('set');
                $screen.classList.add('go');
                $screen.textContent='지금이야!!';
                //시간 측정 시작
                startTime = new Date();
            },Math.floor(Math.random()*1000 + 2000)); // 2000~3000 사이
        // Set 단계
        } else if (event.target.classList.contains('set')) {
            clearTimeout(timeOutId);
            // 부정 클릭 
            $screen.classList.replace('set','ready');
            $screen.textContent='미리 클릭하는것은 반칙입니다.';
        } else if (event.target.classList.contains('go')) {
            //시간 측정 끝
            endTime = new Date();
            //시간 차이 계산하기
            // $result.textContent = `${endTime - startTime}ms`;
            const current = endTime - startTime;
            records.push(current);
            // 평균 구하기
            // reduce는 매개변수 2개를 받아옴 a=누적값 c=현재값 + 초기값(넣지 않으면 첫번째 값이 초기값)
            // [1,2,3,4].reduce((a, c) => { return a+c },0 ) 
            // 중괄호와 return이 만나면 생략 가능
            // 배열을 객체 리터럴로 바꿀 수 있음.
            // 예) ['철수','영희','현영'].reduce((a, c, i) => { a[i] = c; return a }, {})
            const average = records.reduce((a, c) => a + c) /records.length;
            $result.textContent = `현재 속도: ${current}ms`;
            $average.textContent = `평균 속도: ${average}ms`;

            // Top3 추가
            const topThree = records.sort((a, c) => a - c).slice(0,3);
            topThree.forEach((top, index) => {
                $average.append(
                    document.createElement('br'), `${index +1}위 : ${top}ms`,
                );
            });
            startTime = null;
            endTime = null;
            $screen.classList.remove('go');
            $screen.classList.add('ready');
            $screen.textContent='다시 시작하기!!';
        }
    } )
