import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./models/todoModel";
import { TodoList } from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo === "" || !todo) return alert("Please enter your todo");

    const newTodo: Todo = { id: Date.now(), todo, isCompleted: false };

    setTodos((prev: Todo[]): Todo[] => {
      return [...prev, newTodo];
    });
    setTodo("");
  };

  return (
    <>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
};

export default App;
