import React, { KeyboardEvent } from "react";
import { ITextFieldProps } from "../interfaces";

const TextField: React.FC<ITextFieldProps> = ({ value, onChange, onClick }) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="add details"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button className="btn" onClick={onClick}>
        Add
      </button>
    </div>
  );
};

export default TextField;
