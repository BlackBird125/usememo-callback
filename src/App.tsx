import React, { useState, useCallback, useMemo } from "react";
import { Todo } from "./types/todo";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  // useCallbackを使用して削除関数をメモ化
  const handleDelete = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []); // 依存配列が空なので、関数は一度だけ作成される

  // 新しいTodoを追加する関数
  const handleAdd = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText("");
    }
  };

  // useMemoを使用してタスク数を計算
  const todoCount = useMemo(() => {
    console.log("Calculating todo count...");
    return todos.length;
  }, [todos]); // todosが変更されたときのみ再計算

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
      <h1>Todoリスト</h1>

      {/* タスク数の表示 */}
      <div style={{ marginBottom: "20px" }}>
        <strong>タスク数: {todoCount}</strong>
      </div>

      {/* 入力フォーム */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder="新しいタスクを入力"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleAdd}>追加</button>
      </div>

      {/* Todoリスト */}
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
};

export default App;
