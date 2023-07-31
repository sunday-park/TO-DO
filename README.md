# 📝TO-DO
React 기초문법 TO-DO 리스트
개인적으로 학습  중인 React를 사용한 to-do체크리스트 입니다.
React 기초문법인 React  hook의 useState, component, prop 등을 사용하였습니다.
이를 통해 할 일을 작성하고, 삭제하고, 상세정보를 확인할 수 있습니다.

## 개발환경
`HTML` `CSS` `JavaScript` `JQuery (3.41)`
`VSCode(v1.74)`
`Node.js(v18.14.0)`

## 기능
* 글 작성/삭제
* component  모달
* 완료 글에 체크표시
<br>

>**글 작성/삭제하기**
```javascript
let  [게시글, set게시글]  =  useState([
	{ id: 1, content: '할 일을 작성해보세요!', checked:  false }
]);
let [inputs, setInputs] = useState('');

<input
onChange={(e) => {
	setInputs(e.target.value);
}}
className="write_title"
/>
<button className="write_btn"
	onClick={() => {
		let copy = [...게시글];
		if (inputs === "") {
			alert("내용을 입력해 주세요.");
		} else {
			copy.unshift({
			id: copy.length +  1,
			content: inputs,
			checked: false
		});
		set게시글(copy);
		setInputs("");
	}
}}> 추가 </button>
```
- `<input>` 요소를 사용하여 사용자가 할 일을 입력할 수 있는 입력창을 생성하고 텍스트를 입력할 때마다`inputs` 상태를 업데이트합니다.
- '추가' 버튼으로 `게시글` state에 새로운 할 일 객체를 생성하여 목록의 맨 앞에 추가합니다.
<br>

>**component  모달**
```javascript
{modal === true? (
	<Modal
		title={title}
		게시글={게시글}
		날짜={formattedDate}
		삭제={deleteHandler}
	/>
	) : null}
	</div>
	);
}

function Modal(props) {
	const 게시글 = props.게시글.find((게시글) => 게시글.id === props.title);
		return (
		<div className="modal">
		<h3>{게시글 ? 게시글.content : ''}</h3>
		<p>{props.날짜}</p>
		<button onClick={() => props.삭제(게시글.id)}>삭제</button>
		</div>
	);
}
```
- `modal` 상태가 `true`인 경우에만 모달 컴포넌트인 `Modal`을 렌더링합니다.
- `Modal` 컴포넌트에서는 state 2개와 함수 2개를 props로 전달합니다.
- `props.날짜`는 TO-DO 항목을 추가할 때 생성된 `formattedDate`를 표시합니다.
- '삭제' 버튼을 클릭하면 `props.삭제` 함수가 호출되고, 이 함수는 선택한 할 일의 `id`를 인자로 받아 해당 할 일을 삭제하는 역할을 수행합니다.
<br>

>**완료 글에 체크표시**
```javascript
let [게시글, set게시글] = useState([
	{ id: 1, content: '할 일을 작성해보세요!', checked: false }
]);
let  [title, setTitle]  =  useState(0);

const checkClickHandler = (id) => {
set게시글((prev게시글) => {
return prev게시글.map((게시글) =>
		게시글.id === id? { ...게시글, checked: !게시글.checked } : 게시글
		);
	});
};

return (
{게시글.map(function (data) {
const titleClass = data.checked? "title_checked" : "title";
	return (
	<div className="list" key={data.id}>
	<div className="container">
	<button className="checkbtn" onClick={() => 
		checkClickHandler(data.id)}>
		{data.checked? <AiOutlineCheckSquare /> : <AiOutlineBorder />}
	</button>
		<h3
		className={titleClass}
		onClick={() => {
		setModal(!modal);
		setTitle(data.id);
		}}
		>
		{data.content}
		</h3>
		</div>
	</div>
	);
})}
```
- `checkClickHandler` 함수는 사용자가 할 일을 클릭하면 해당 할 일의 `checked` 속성을 토글하는 역할을 수행합니다.
- 사용자가 할 일을 클릭하면 `checkClickHandler` 함수가 호출되어 해당 할 일의 `checked` 상태가 토글되고, 할 일 내용`content`가 보여지는 부분의 클래스(줄 긋기)가 변경됩니다. 
- 체크 버튼은 선택된 상태일 때는 체크 표시가 나타나고, 아닌 경우에는 빈 박스가 나타납니다.
<br>

## 리뷰

### 해결한 문제
>* 글 추가 후 input창이 초기화되지 않음
>* setInputs("");을 넣어도 inputs의 state는 비워지지만 input창 자체의 값이 지워지지 않는다. 
>>내가...input 태그의 value값을 state의 input으로 설정해주지 않아서 그렇다...

### 해결되지 않은 문제
* localstorage에 저장되나 새로고침 시 사라짐
* (진행중중)
