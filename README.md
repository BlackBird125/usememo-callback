# React Hooks (useCallback, useMemo) 基礎学習プロジェクト

このプロジェクトは、React の `useCallback` と `useMemo` フックの基本的な使用方法を学ぶためのサンプルアプリケーションです。

## 機能概要

シンプルな Todo リストアプリケーションを通じて、以下の機能とフックの使用方法を学習します：

1. タスクの追加と削除
2. useCallback による関数のメモ化
3. useMemo による計算結果のメモ化
4. React のパフォーマンス最適化

## 実装機能

- タスク追加フォーム（入力欄と追加ボタン）
- タスクリストの表示
- 各タスクの削除機能
- タスク数の表示（useMemo で最適化）
- 削除関数のメモ化（useCallback で最適化）

## 技術スタック

- React 18
- TypeScript
- React Hooks
  - useState
  - useCallback
  - useMemo

## プロジェクト構造

```
hooks-basic/
├── src/
│   ├── components/
│   │   ├── TodoItem.tsx   // 個別の Todo アイテムコンポーネント
│   │   └── TodoList.tsx   // Todo リストコンポーネント
│   ├── types/
│   │   └── todo.ts        // 型定義
│   └── App.tsx           // メインアプリケーション
```

## パフォーマンス最適化のポイント

1. **useCallback の使用**

   ```tsx
   const handleDelete = useCallback((id: number) => {
     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
   }, []);
   ```

   - 削除関数をメモ化して不要な再生成を防止
   - 子コンポーネントの不要な再レンダリングを防止

2. **useMemo の使用**

   ```tsx
   const todoCount = useMemo(() => {
     console.log("Calculating todo count...");
     return todos.length;
   }, [todos]);
   ```

   - タスク数の計算をメモ化
   - todos が変更されたときのみ再計算

3. **React.memo の使用**
   ```tsx
   const TodoItem = memo(({ todo, onDelete }) => {
     // ...
   });
   ```
   - 個別の Todo アイテムコンポーネントをメモ化
   - props が変更されない限り再レンダリングしない

## 主要なコード例

1. **Todo の型定義**

   ```tsx
   // types/todo.ts
   export interface Todo {
     id: number;
     text: string;
   }
   ```

2. **TodoItem コンポーネント**

   ```tsx
   // components/TodoItem.tsx
   const TodoItem: React.FC<TodoItemProps> = memo(({ todo, onDelete }) => {
     console.log(`TodoItem rendered: ${todo.text}`);
     return (
       <div>
         <span>{todo.text}</span>
         <button onClick={() => onDelete(todo.id)}>削除</button>
       </div>
     );
   });
   ```

3. **TodoList コンポーネント**
   ```tsx
   // components/TodoList.tsx
   const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
     return (
       <div>
         {todos.map((todo) => (
           <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
         ))}
       </div>
     );
   };
   ```

## セットアップ方法

1. 依存パッケージのインストール:

```bash
npm install
```

2. 開発サーバーの起動:

```bash
npm start
```

アプリケーションは http://localhost:3000 で起動します。

## 学習ポイント

1. **useCallback**

   - 関数のメモ化による最適化
   - 依存配列の適切な使用
   - 子コンポーネントへの関数の受け渡し

2. **useMemo**

   - 計算結果のメモ化
   - 重い計算の最適化
   - 依存値の変更時のみ再計算

3. **パフォーマンス最適化**
   - コンポーネントの不要な再レンダリング防止
   - メモ化による計算コストの削減
   - React DevTools を使用したパフォーマンスの確認

## デバッグとパフォーマンス確認

1. **コンソールログの確認**

   - `TodoItem rendered: [text]` - 個別のアイテムが再レンダリングされたとき
   - `Calculating todo count...` - タスク数が再計算されたとき

2. **React DevTools の使用**
   - コンポーネントの再レンダリングの確認
   - メモ化が正しく機能しているかの確認
   - パフォーマンスプロファイリング

## 注意点

- メモ化は常に必要なわけではありません
- 過度な最適化は避け、必要な場合のみ使用してください
- コンソールログを確認して、メモ化が正しく機能しているか確認できます

## 参考リンク

- [React 公式ドキュメント - useCallback](https://react.dev/reference/react/useCallback)
- [React 公式ドキュメント - useMemo](https://react.dev/reference/react/useMemo)
- [React 公式ドキュメント - パフォーマンス最適化](https://react.dev/learn/render-and-commit)
