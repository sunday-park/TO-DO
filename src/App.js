import './App.css';
import { useState } from 'react';
import { AiOutlineBorder, AiOutlineCheckSquare } from 'react-icons/ai';
import React, { useEffect } from 'react';

function App() {

  let [게시글, set게시글] = useState([
    { id: 1, content: '할 일을 작성해보세요!', checked: false }
  ]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputs, setInputs] = useState('');

  const regDate = new Date();
  const year = regDate.getFullYear();
  const month = regDate.getMonth() + 1;
  const day = regDate.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const checkClickHandler = (id) => {
    set게시글((prev게시글) => {
      return prev게시글.map((게시글) =>
        게시글.id === id ? { ...게시글, checked: !게시글.checked } : 게시글
      );
    });
  };

  const deleteHandler = (id) => {
    let copy = [...게시글];
    copy = copy.filter((게시글) => 게시글.id !== id);
    set게시글(copy);
    setModal(false);
  };

  // 게시글이 업데이트될 때마다 로컬 스토리지에 저장
      //아직 미완성...
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(게시글));
  }, [게시글]);

  return (
    <div className="App">
      <div className="nav">
        <h2>TO-DO</h2>
      </div>

      {게시글.map(function (data) {
        const titleClass = data.checked ? "title_checked" : "title";
        return (
          <div className="list" key={data.id}>
            <div className="container">
              <button className="checkbtn" onClick={() => checkClickHandler(data.id)}>
                {data.checked ? <AiOutlineCheckSquare /> : <AiOutlineBorder />}
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

      <input
        value={inputs}
        onChange={(e) => {
          setInputs(e.target.value);
          console.log(inputs);
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
              id: copy.length + 1,
              content: inputs,
              checked: false
            });
            set게시글(copy);
            setInputs("");
            console.log(inputs);
          }
        }}
      >
        추가
      </button>

      {modal === true ? (
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

export default App;