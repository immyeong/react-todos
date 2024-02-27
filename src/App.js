import React, {useState} from "react";
import "./App.css";
import List from"./components/Lists";
import Form from "./components/Form";

const initialData = localStorage.getItem('myTodo') ? JSON.parse(localStorage.getItem('myTodo')) : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialData);
  const [value, setValue] = useState("");

  const TodoUpdate = (e) => {
    e.preventDefault();

    let newTodo = {
        id : Date.now(),
        title : value,
        completed : false
    }

    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem("myTodo", JSON.stringify([...todoData,newTodo]));
    setValue("");

  }
  const deleteAll = () => {
    setTodoData([]);
    localStorage.setItem("myTodo", JSON.stringify([]));
  }

    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between">
            <h1>할 일 목록</h1>
            <button onClick={deleteAll}>Delete All</button>
          </div>
          <List todoData={todoData} setTodoData={setTodoData}/>

          <Form TodoUpdate={TodoUpdate} value={value} setValue={setValue}/>
        </div>
      </div>
    )
}