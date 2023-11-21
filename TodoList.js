
// Stores a list of todo
let todos = [];

// Get the todo list from local storage if available
if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    renderTodos();
}

// Todo : show list
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
      <span>${todo}</span>
      <div>
       <button class="btn btn-primary" onclick="editTodo(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
        todoList.appendChild(todoItem);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

//  Todo : Add
function saveTodo() {
    const todoText = document.getElementById('todo-text').value;
    if (todoText.trim() !== '') {
        todos.push(todoText);
        renderTodos();
        closePopup();
        playSuccessSound();
        showToast(`Todo added ${todos} successfully`, `success`);
    } else {
        playErrorSound();
        showToast('Todo text cannot be empty', 'error');
    }
}

// Todo : edit
function editTodo(index) {
    const newTodoText = prompt('Enter new todo text');
    if (newTodoText !== null) {
        todos[index] = newTodoText;
        renderTodos();
        playSuccessSound();
        showToast(`Todo updated ${todos} successfully`, `success`);
    }
}

// Todo : delete
function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todos.splice(index, 1);
        renderTodos();
        playSuccessSound();
        showToast(`Todo deleted ${todos} successfully`, `success`);
    }
}

// show toast message
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add(type);
    toast.style.display = 'block';

    setTimeout(function () {
        toast.style.display = 'none';
        toast.classList.remove(type);
    }, 2000);
}
// Open popup
function openPopup(title) {
    document.getElementById('popup-title').textContent = title + ' Todo';
    document.getElementById('todo-text').value = '';
    document.getElementById('popup').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Sound Success
function playSuccessSound() {
    const audio = document.getElementById('toastSoundSuccess');
    audio.play();
}

// Sound Error
function playErrorSound() {
    const audio = document.getElementById('toastSoundError');
    audio.play();
}