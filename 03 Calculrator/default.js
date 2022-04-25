let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

// addEventListener에 함수가 아닌것이 등록되어 이곳에서 return을 이용해 함수로 만들어준다.
// return이 있을경우 줄여서 함수안에 함수를 리턴하는 방식으로도 작성 가능 () => () => { 
// 함수가 함수를 리턴 = 고차 함수 (high order function)

// const onClickNumber = (number) => (event) => {
// 	if(operator) { // operator가 비어있지 않다
// 		numTwo += 'number';
// 	} else {  // 비어있다
// 		numOne += 'number';
// 	}
// 	$result.value += 'number';
// }; 

//// if 문 줄이기
// const onClickNumber = (event) => {
// 	if(operator) { // operator가 비어있지 않다
// 		if (!numTwo) {
// 			$result.value ='';
// 		}
// 		numTwo += event.target.textContent;
// 	} else {  // 비어있다
// 		numOne += event.target.textContent;
// 	}
// 	$result.value += event.target.textContent;
// }; 

// if문 중첩 피하기 (return 또는 break로 중단하면 else가 필요 없어짐)
const onClickNumber = (event) => {
	if(!operator) { // 비어있을 경우
		numOne += event.target.textContent;
		$result.value += event.target.textContent;
			return;
		} 
		
		// 비어 있지 않다
		if (!numTwo) { 
			$result.value ='';
		}
		numTwo += event.target.textContent;
		$result.value += event.target.textContent;
	};


document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

const onClickOperator = (op) => () => {
	if(numTwo) {
		switch (operator) { 
			case '+':
				$result.value = parseInt(numOne) + parseInt(numTwo);
				break;
			case '-':
				$result.value = parseInt(numOne) - parseInt(numTwo);
				break;
			case '/':
				$result.value = parseInt(numOne) / parseInt(numTwo);
				break;
			case '*':
				$result.value = parseInt(numOne) * parseInt(numTwo);
				break;
			default:
				break;
		}
		$operator.value = '';
		numOne = $result.value;
		numTwo = '';
		
	}
	if (numOne) {
		operator = op;
		$operator.value = op;
	} else {
		alery ('숫자를 먼저 입력하세요.');
	}
}

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#calculate').addEventListener('click', ()=> {
	if(numTwo) {
		switch (operator) { 
			case '+':
				$result.value = parseInt(numOne) + parseInt(numTwo);
				break;
			case '-':
				$result.value = parseInt(numOne) - parseInt(numTwo);
				break;
			case '/':
				$result.value = parseInt(numOne) / parseInt(numTwo);
				break;
			case '*':
				$result.value = parseInt(numOne) * parseInt(numTwo);
				break;
			default:
				break;
		}
		$operator.value = '';
		numOne = $result.value;
		operator = '';
		numTwo = '';
	} else {
		alert('숫자를 먼저 입력하세요');
	}
});

document.querySelector('#clear').addEventListener('click', ()=> {
	numOne = '';
	operator = '';
	numTwo = '';
	$operator.value = '';
	$result.value = '';
});


    // 키보드 이벤트 지정
    document.addEventListener('keyup', (event) => {
			event.preventDefault();
			switch (event.key) { 
				case '0': 
				document.querySelector('#num-0').click();
					break;
				case '1':
				document.querySelector('#num-1').click();
					break;
				case '2':
				document.querySelector('#num-2').click();
					break;
				case '3':
				document.querySelector('#num-3').click();
					break;
				case '4':
				document.querySelector('#num-4').click();
					break;
				case '5':
				document.querySelector('#num-5').click();
					break;
				case '6':
				document.querySelector('#num-6').click();
					break;
				case '7':
				document.querySelector('#num-7').click();
					break;
				case '8':
				document.querySelector('#num-8').click();
					break;
				case '9':
				document.querySelector('#num-9').click();
					break;
				case '+':
				document.querySelector('#plus').click();
					break;
				case '-':
				document.querySelector('#minus').click();
					break;
				case '/':
				document.querySelector('#divide').click();
					break;
				case '*':
				document.querySelector('#multiply').click();
					break;
				case 'Enter':
				document.querySelector('#calculate').click();
					break;
				case 'Escape' :
				case 'c':
				case 'ㅊ':
				document.querySelector('#clear').click();
					break;
				default:
					break;
			}
	})
