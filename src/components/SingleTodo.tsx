import React, { useRef, useState } from "react";
import { Todo } from "../models/todoModel";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCompleted = (id: number) => {
    const updatedTodos: Todo[] = todos.map((t: Todo): Todo => {
      return {
        ...t,
        isCompleted: t.id === id ? !t.isCompleted : t.isCompleted,
      };
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id: number): void => {
    const updatedTodos: Todo[] = todos.filter(
      (t: Todo): boolean => t.id !== id
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (isCompleted: boolean): void => {
    if (!isEditMode && !isCompleted) {
      inputRef.current?.focus();
      setIsEditMode(true);
    }
  };

  const onHandleEditSubmit = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    const updatedTodos = todos.map((t: Todo): Todo => {
      return { ...t, todo: t.id === id ? editTodo : t.todo };
    });
    setTodos(updatedTodos);
    setIsEditMode(false);
  };

  return (
    <form
      className="todos__single"
      onSubmit={(e) => onHandleEditSubmit(e, todo.id)}
    >
      {isEditMode ? (
        <input
          ref={inputRef}
          onChange={(e) => setEditTodo(e.target.value)}
          type="text"
          className="todos__single--text"
          value={editTodo}
        />
      ) : todo.isCompleted ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span className="icon">
          <AiFillEdit onClick={() => handleEdit(todo.isCompleted)} />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span className="icon">
          <MdDone onClick={() => handleCompleted(todo.id)} />
        </span>
      </div>
    </form>
  );
};

// const Dummy = () => {
//   interface Action {
//     type: "add" | "remove";
//     payload: string;
//   }

//   const reducer = (state: Todo[], action: Action) => {};

//   const [state, dispatch] = useReducer(reducer, []);
//   return {};
// };
