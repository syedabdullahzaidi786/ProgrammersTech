const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        const todoContent = document.createElement('span');
        todoContent.innerText = todoText;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            todoEl.remove();
            updateLS();
        });

        todoEl.appendChild(todoContent);
        todoEl.appendChild(deleteBtn);

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.querySelector('span').innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
