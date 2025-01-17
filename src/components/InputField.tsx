import React, { useRef } from "react";
import "./styles.css";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export default function InputField({
  todo,
  setTodo,
  handleAdd,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setTodo(value);
  };

  return (
    <div>
      <form action="" className="input">
        <input
          ref={inputRef}
          value={todo}
          type="text"
          className="input__box"
          placeholder="Enter a task"
          onChange={onChange}
        />
        <button
          className="input_submit"
          type="submit"
          onClick={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
          }}
        >
          Go
        </button>
      </form>
    </div>
  );
}
