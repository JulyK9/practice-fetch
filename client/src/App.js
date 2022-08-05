import { useEffect, useState } from "react";

// 서버에 데이터 요청

// fetch 기본 제공 api
// axios 라이브러리 사용

// 서버주소를 알아야 함
// 어떤 http method를 사용할지 알아야 됨

function App() {

  // 받은 데이터를 화면에 렌더하기 위한 작업
  const [todoList, setTodoList] = useState(null);

  // 컴포넌트가 최초 렌더링 될 때만 실행될 수 있도록 함 (데이터 fetch 반복으로 상태가 계속 변경되서 무한 반복되는 걸 방지)
  // useEffect 활용
  useEffect(() => {
    fetch("http://localhost:4000/api/todo")
    .then((response) => response.json())
    .then((data) => setTodoList(data));
  }, [])
  
  // 클릭 했을 때
  const onSubmitHandler = (e) => {
    e.preventDefault();               // submit 기본동작 막기
    // 입력된 데이터 값들을 받아오고
    const text = e.target.text.value; // target.value에서 해당 input에 name으로 value를 연결할 수 있음!
    const done = e.target.done.checked;  // checkbox의 체크 여부 확인시 e.target.checked 사용
    // 서버에 데이터 추가 요청 (post)
    fetch("http://localhost:4000/api/todo", {
      method: 'POST',
      headers: {                             // headers 라고 정확히 써줘야 함
        'Content-Type': 'application/json',  // 콘텐트타입을 명시해줘야 입력한 데이터가 제대로 전달되네
      },
      body: JSON.stringify({
        text,
        done,
      })
    })

  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
        {todoList?.map((todo) => (  // todo가 null일때는 undefined를 만들어서 렌더링이 되지 않도록 옵셔널체이닝 ?.
          <div key={todo.id} style={{display: "flex", justifyContent: "flex-start", gap: 10}}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? 'Y' : 'N'}</div>
          </div>
        ))}
    </div>
  );
}

export default App;
