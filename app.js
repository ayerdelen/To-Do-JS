//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();

  const todo = `
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

  todoList.innerHTML += todo;
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    item.remove();
  }
}
