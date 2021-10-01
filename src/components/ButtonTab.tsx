import React from "react";
import { ButtonTabProps } from "../interfaces";

const ButtonTab: React.FC<ButtonTabProps> = ({ handleTab, tab, type }) => {
  return (
    <button
      onClick={() => handleTab(type)}
      className={tab === type ? "active" : "inactive"}
    >
      {type.toUpperCase()}
    </button>
  );
};

export default ButtonTab;
