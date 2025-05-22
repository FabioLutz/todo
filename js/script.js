const todoInput = document.getElementById("task-input");
const todoAdd = document.getElementById("add-task-button");
const todoList = document.getElementById("todo-list");

let allTodos = [];

todoAdd.addEventListener("click", function () {
    addTodo();
});

todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        todoAdd.click();
    }
});

window.onload = () => {
    const savedData = localStorage.getItem("allTodos");
    if (savedData) {
        allTodos = JSON.parse(savedData);
    }
    renderTodo();
};

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length === 0) {
        return;
    }

    const todoItem = { id: Date.now(), name: todoText, checked: false };
    allTodos.push(todoItem);
    saveToLocalStorage();

    renderTodo();

    todoInput.value = "";
}

function saveToLocalStorage() {
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
}

function renderTodo() {
    todoList.innerHTML = "";

    allTodos.forEach(todo => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${todo.id}`;
        checkbox.name = "task";
        checkbox.value = todo.name;
        checkbox.checked = todo.checked;
        checkbox.addEventListener("change", () => updateCheckStatus(todo.id));

        const label = document.createElement("label");
        label.setAttribute("for", `task-${todo.id}`);
        label.textContent = todo.name;

        const button = document.createElement("button");
        button.setAttribute("onclick", `removeTodo(${todo.id})`);
        button.textContent = "Excluir";

        const todoLi = document.createElement("li");
        todoLi.id = "task-item";

        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        todoLi.appendChild(checkbox);
        todoLi.appendChild(label);
        todoLi.appendChild(button);
        todoItem.appendChild(todoLi);
        todoList.appendChild(todoItem);
    })
}

function updateCheckStatus(id) {
    const todo = allTodos.find(todo => todo.id === id);
    if (todo) {
        todo.checked = !todo.checked;
        saveToLocalStorage();
        renderTodo();
    }
}

function removeTodo(id) {
    allTodos = allTodos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    renderTodo();
}
