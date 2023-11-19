 // TodoList.jsx
 import { useEffect, useRef } from "react";
 import { TodoItem } from "./TodoItem";
  
 export function TodoList({ todos, toggleTodo, deleteTodo, selectedItems, setSelectedItems, selectAll }) {
    const listRef = useRef(null);
    useEffect(() => {
    const listItems = listRef.current.children;
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      listItem.classList.add("visible");
    }
  }, [todos]);

    return (
     <ul className="list" ref={listRef}>
       {todos.length === 0 && "No Todos"}
       {todos.map((todo) => {
         return (
           <TodoItem
             {...todo}
             key={todo.id}
             toggleTodo={toggleTodo}
             deleteTodo={deleteTodo}
             selectedItems={selectedItems}
             setSelectedItems={setSelectedItems}
             selectAll={selectAll}
           />
         );
       })}
     </ul>
   );
 }