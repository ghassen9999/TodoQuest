// TodoItem.jsx
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, selectedItems, setSelectedItems, selectAll }) {
    const isChecked = selectAll || selectedItems.includes(id);
  
    function handleCheckboxChange(e) {
      const newSelectedItems = [...selectedItems];
      if (e.target.checked) {
        newSelectedItems.push(id);
      } else {
        const index = newSelectedItems.indexOf(id);
        if (index !== -1) {
          newSelectedItems.splice(index, 1);
        }
      }
      setSelectedItems(newSelectedItems);
    }
  
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {title}
        </label>
      </li>
    );
  }
  
  