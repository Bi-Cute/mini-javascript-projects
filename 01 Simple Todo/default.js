  // (01) DOM 컨텐츠가 로딩되면 실행
document.addEventListener('DOMContentLoaded', () => {

    // (02) h1 태그 생성 > 내용 작성 > body에 추가
    const h1 = document.createElement('h1');
    h1.textContent = 'Simple Todo';
    document.body.appendChild(h1)

    // (03) input 창 생성 > body에 추가
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '10자 내외로 할일을 작성해 주세요'
    document.body.appendChild(input)


    const toDos_LS = 'toDos';

    // 키보드와 추가 버튼 내용 입력 중복 부분 > 함수 ~처리
    function insertTodo() {
        

        // (05-1) input이 비어있지 않을 경우에만 작동
        if (input.value !== '') {
            
            // (05-2) div 박스를 생성 > 추가
            const div = document.createElement('div');
            document.body.appendChild(div);
            div.className = 'todoIndex';
            
            // (05-3) input 박스를 생성 > 타입은 체크박스 > 05-2에서 생성한 div 안에 삽입
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            div.appendChild(checkbox)
            
            // (05-4) 체크 박스에 이벤트 추가
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    span.style.textDecoration = 'line-through'
                    span.style.textDecorationColor = 'red'
                } else {
                    span.style.textDecoration = '';
                }
            })

            // (06) span 태그 생성 > 내용은 input에 입력된 값으로 > div에 추가 > input 창 비우기
            const span = document.createElement('span')
            span.textContent = input.value
            div.appendChild(span)
            input.value = '';

            // (07) deleteButton 버튼 생성 > 내용 입력 > div에 추가 
            const deleteButton = document.createElement('button')
            deleteButton.textContent ="제거하기"
            div.appendChild(deleteButton)
            
            // (07-1) Delete 버튼 이벤트 생성
            deleteButton.addEventListener('click', () => {
                div.parentNode.removeChild(div)
            })
        }
        const toDos = localStorage.getItem(insertTodo);
    }

    // 이벤트 객체의 키코드가 엔터(13)인지 확인후 실행
    input.addEventListener('keyup', (event) => {()=>
        if (event.keyCode == 13) {
            // 아래 내용은 추가하기 버튼을 눌렀을때와 동일한 액션
            insertTodo();
        }
    })

    // (04) 버튼 생성 > 내용 작성 > body에 추가
    const addButton = document.createElement('button')
    addButton.textContent = '추가하기'
    document.body.appendChild(addButton)

    // (05) 추가하기 버튼을 트리거로 이벤트 발생
    addButton.addEventListener('click', () => {
    insertTodo();
    })
})
