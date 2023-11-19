import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./style.css";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      })
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function handleSelectAll() {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(todos.map((todo) => todo.id));
    } else {
      setSelectedItems([]);
    }
  }

  function handleDeleteSelected() {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !selectedItems.includes(todo.id))
    );
    setSelectedItems([]);
  }

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }
  function handleSearch() {
    // Implement your search logic here
    // For example, you can filter the todos based on the search term
    // and update the filteredTodos state.
    // For simplicity, we will just console log the search term for now.
    console.log("Searching for:", searchTerm);
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <div>
        <button onClick={handleSelectAll} className="btn">
          {selectAll ? "Unselect All" : "Select All"}
        </button>
        {selectedItems.length > 0 && (
          <button onClick={handleDeleteSelected} className="btn btn-danger">
            Delete Selected
          </button>
        )}
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search..."
        />
        <button onClick={handleSearch} className="btn">
        <i className="fas fa-search"></i>Search
        </button>
      </div>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectAll={selectAll}
      />
    </>
  );
}
