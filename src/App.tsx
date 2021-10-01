import React, { FormEvent, useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TextField from "./components/TextField";
import ButtonTab from "./components/ButtonTab";
import { IToDo } from "./interfaces";

function App() {
  const [todo, setTodo] = useState({ name: "", status: false });
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [tab, setTab] = useState("all");

  const saveToStorage = (item: IToDo[]) => {
    localStorage.setItem("todo", JSON.stringify(item));
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setTodo({ ...todo, name: event.currentTarget.value });
  };

  useEffect(() => {
    const data = localStorage.getItem("todo");
    if (typeof data === "string") {
      const storageItem: IToDo[] = JSON.parse(data);
      setTodos(storageItem);
    }
  }, []);

  const handleTab = (action: string) => {
    setTab(action);
  };

  const addTodo = () => {
    if (todo.name === "") return;
    setTodos((prevValue) => [...prevValue, todo]);
    saveToStorage([...todos, todo]);
    setTodo({ ...todo, name: "" });
  };

  const deleteTodo = (name: string) => {
    const filteredTodos = todos.filter((item) => item.name !== name);
    setTodos(filteredTodos);
    saveToStorage(filteredTodos);
  };

  const deleteAll = () => {
    const filteredTodos = todos.filter((item) => item.status !== true);
    setTodos(filteredTodos);
    saveToStorage(filteredTodos);
  };

  const checkTodo = (name: string) => {
    const checkedTodo = todos.map((item) => {
      if (item.name === name) {
        return { name, status: !item.status };
      } else {
        return item;
      }
    });
    setTodos(checkedTodo);
    saveToStorage(checkedTodo);
  };

  return (
    <div>
      <div className="container">
        <h1>#todo</h1>

        <div className="tab">
          <ButtonTab handleTab={handleTab} type="all" tab={tab} />
          <ButtonTab handleTab={handleTab} type="active" tab={tab} />
          <ButtonTab handleTab={handleTab} type="completed" tab={tab} />
        </div>
        <hr />

        {tab !== "completed" && (
          <TextField
            value={todo.name}
            onChange={handleChange}
            onClick={addTodo}
          />
        )}

        <div className="todo">
          {tab === "all" &&
            todos.map((item, index) => (
              <TodoItem
                key={index}
                title={item.name}
                status={item.status}
                onChange={() => checkTodo(item.name)}
              />
            ))}
          {tab === "active" &&
            todos.map(
              (item, index) =>
                item.status === false && (
                  <TodoItem
                    key={index}
                    title={item.name}
                    status={item.status}
                    onChange={() => checkTodo(item.name)}
                  />
                )
            )}
          {tab === "completed" && (
            <div>
              {todos.map(
                (item, index) =>
                  item.status === true && (
                    <div className="completed">
                      <TodoItem
                        key={index}
                        title={item.name}
                        status={item.status}
                        onChange={() => checkTodo(item.name)}
                      />
                      <button onClick={() => deleteTodo(item.name)}>
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  )
              )}
              <div className="flex-end">
                <button onClick={deleteAll} className="delete-btn">
                  delete all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
