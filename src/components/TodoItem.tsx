import React, { useState } from "react";
import { ITodoProps } from "../interfaces";

const TodoItem: React.FC<ITodoProps> = ({ title, status, onChange }) => {
  const [check, setCheck] = useState(status);

  const handleCheck = () => {
    setCheck((prevState) => !prevState);
    onChange();
  };

  return (
    <div className="todo-item">
      <input type="checkbox" defaultChecked={check} onChange={handleCheck} />
      <p className={check ? "checked" : ""}>{title}</p>
    </div>
  );
};

export default TodoItem;
