import React, { memo } from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

// memoを使用してコンポーネントをメモ化
const TodoItem: React.FC<TodoItemProps> = memo(({ todo, onDelete }) => {
  console.log(`TodoItem rendered: ${todo.text}`);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </div>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;
