//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(e) {
  //Prevent form from submitting
  e.preventDefault();

  const todoDiv = `
    <div class="todo">
        <li class="todo-item">${todoInput.value}</li>
        <button class="complete-btn">
        <i class="fas fa-check"></i>
        </button>
        <button class="trash-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>
  `;
  //Add to the local storage

  todoList.innerHTML += todoDiv;
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //Delete
  if (item.classList[0] === "trash-btn") {
    const toDo = item.parentElement;
    toDo.classList.add("fall");
    removeLocalTodos(toDo);
    toDo.addEventListener("transitionend", () => {
      toDo.remove();
    });
  }

  //Check Mark

  if (item.classList[0] === "complete-btn") {
    const toDo = item.parentElement;
    toDo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = document.querySelectorAll(".todo");
  // i finr childrens with selector alll
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = `
    <div class="todo">
        <li class="todo-item">${todo}</li>
        <button class="complete-btn">
        <i class="fas fa-check"></i>
        </button>
        <button class="trash-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>
  `;
    //Add to the local storage

    todoList.innerHTML += todoDiv;
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
