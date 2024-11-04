// Import the CSS file for styles
import './style.css';

// Define the Todo interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

// Initialize an empty array to store todos
export let todos: Todo[] = [];

// Get references to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

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

    addCheckboxListener(li, todo.id);
    addPriorityChangeListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);

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
    todo.completed = isCompleted;
    renderTodos();
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
    todo.priority = newPriority;
    renderTodos();
  }
};

// Step 6: Add a new todo item with default priority set to 'Medium'
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: 'Medium',
  };
  todos.push(newTodo);
  renderTodos();
};

// Event listener for form submission
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  
  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text);
    todoInput.value = '';
  } else {
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

// Step 7: Function to remove a todo item by ID
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
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

