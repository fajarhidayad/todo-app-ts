import { FormEvent } from "react";

export interface ITextFieldProps {
  value: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export interface ITodoProps {
  title: string;
  status: boolean;
  onChange: () => void;
}

export interface IToDo {
  name: string;
  status: boolean;
}

export interface ButtonTabProps {
  handleTab: (type: string) => void;
  type: string;
  tab: string;
}
