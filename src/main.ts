// Import the CSS file for styles
import './style.css';

// Define the Todo interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';  // Added priority field
}

// Initialize an empty array to store todos
export let todos: Todo[] = [];

// Get references to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // for user input validation

// Get references to the new buttons for additional functionality
const clearCompletedBtn = document.getElementById('clear-completed-btn') as HTMLButtonElement;
const toggleAllBtn = document.getElementById('toggle-all-btn') as HTMLButtonElement;

// Step 1: Modify the renderTodos function to add a dropdown to set priority and display priority
const renderTodos = (): void => {
  todoList.innerHTML = '';  // Clear the current list

  // Sort todos by priority (High -> Medium -> Low)
  todos.sort((a, b) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Apply line-through style if the todo is completed
    li.innerHTML = `
      <div class="todo-item-content">
        <input type="checkbox" class="toggle-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text" style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">
          ${todo.text}
        </span>
        <div class="priority-container">
          <select class="priority-dropdown">
            <option value="Low" ${todo.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${todo.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${todo.priority === 'High' ? 'selected' : ''}>High</option>
          </select>
          <span class="priority-label">${todo.priority}</span>
        </div>
      </div>
      <div class="todo-item-actions">
        <button class="remove-btn">Remove</button>
        <button class="edit-btn">Edit</button>
      </div>
    `;

    // Add event listeners
    addCheckboxListener(li, todo.id);     // Add listener for checkbox toggle
    addPriorityChangeListener(li, todo.id); // Add listener for priority dropdown
    addRemoveButtonListener(li, todo.id); // Add listener for remove button
    addEditButtonListener(li, todo.id);   // Add listener for edit button

    todoList.appendChild(li);
  });
};

// Step 2: Add event listener for the checkbox to toggle completion status
const addCheckboxListener = (li: HTMLLIElement, id: number): void => {
  const checkbox = li.querySelector('.toggle-checkbox') as HTMLInputElement;
  checkbox?.addEventListener('change', () => toggleTodoCompletion(id, checkbox.checked));
};

// Step 3: Create a function to toggle the completed status based on checkbox
const toggleTodoCompletion = (id: number, isCompleted: boolean): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = isCompleted; // Set the completion status based on checkbox
    renderTodos(); // Re-render the updated list of todos
  }
};

// Step 4: Add event listener for the priority dropdown
const addPriorityChangeListener = (li: HTMLLIElement, id: number): void => {
  const priorityDropdown = li.querySelector('.priority-dropdown') as HTMLSelectElement;
  priorityDropdown?.addEventListener('change', () => updateTodoPriority(id, priorityDropdown.value as 'Low' | 'Medium' | 'High'));
};

// Step 5: Function to update priority of a todo item
const updateTodoPriority = (id: number, newPriority: 'Low' | 'Medium' | 'High'): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.priority = newPriority; // Update priority
    renderTodos(); // Re-render the updated list of todos
  }
};

// Step 6: Add a new todo item with default priority set to 'Medium'
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: 'Medium', // Default priority
  };
  todos.push(newTodo);
  renderTodos(); // Re-render the updated list of todos
};

// Event listener for form submission
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  
  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text); // Add the todo item
    todoInput.value = ''; // Clear input field
  } else {
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

// Step 7: Function to remove a todo item by ID
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
};

// Step 8: Add event listener for the remove button
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('.remove-btn') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => removeTodo(id));
};

// Step 9: Function to edit a todo item
const editTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const text = prompt('Edit todo', todo.text);
    if (text) {
      todo.text = text;
      renderTodos();
    }
  }
};

// Step 10: Add event listener for the edit button
const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('.edit-btn') as HTMLButtonElement;
  editButton?.addEventListener('click', () => editTodo(id));
};

// Step 11: Function to clear all completed todos
const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos(); // Re-render the updated list of todos
};

// Step 12: Add event listener for the "Clear Completed" button
clearCompletedBtn.addEventListener('click', clearCompletedTodos);

// Step 13: Function to toggle all todos' completion status
const toggleAllTodos = (): void => {
  const allCompleted = todos.every(todo => todo.completed);
  todos.forEach(todo => todo.completed = !allCompleted); // Toggle all to the opposite state
  renderTodos(); // Re-render the updated list of todos
};

// Step 14: Add event listener for the "Toggle All" button
toggleAllBtn.addEventListener('click', toggleAllTodos);

// Initial rendering of todos
renderTodos();

// Color picker functionality for background color change
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      document.body.style.backgroundColor = target.value;
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Initialize color picker on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});
