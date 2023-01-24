let inputValue = document.getElementById("todoInput");
let check = document.getElementById("check-alert");
let todoBox = document.querySelector(".todo-Box");
let filters = document.querySelectorAll(".filters button");
let deleteCompleteItem = document.getElementById("clearItem");
let todos = JSON.parse(localStorage.getItem("todo-list"));
let countItem = document.querySelector("#count");


filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("button.active").classList.remove("active");
    btn.classList.add("active");
    showTodoLists(btn.id);
  });
});

function showTodoLists(filter) {
  let liLists = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let iscompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liLists += `
        <li class="p-3 bg-light mt-3">
          <div class="d-flex listItems">
            <label for="${id}">
              <input onclick="strikeItem(this)" type="checkbox" id="${id}" ${iscompleted} class="form-check-input checkAlert me-2">
              <span class="${iscompleted}" >${todo.name}</span>
            </label>
            <Button onclick="deleteItem(${id})" class="btn delete-btn ms-auto"><i class="fa-solid fa-trash text-danger"></i></Button>
          </div>
        </li>`;
      }
    });
    checkedAll();
    countItem.innerText = todos.filter(data => data.status == "active").length
  }
  todoBox.innerHTML = liLists;
}
showTodoLists("all");



check.addEventListener('click', (e) => {
  if (check.innerText == "Check All") {
    todos = todos.map(todo => {
      return { name: todo.name, status: "completed" };
    })
    checkedAll();
  } else {
    todos = todos.map(todo => {
      return { name: todo.name, status: "active" };
    })
    checkedAll();
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodoLists("all");

});


function checkedAll() {
  let todo = todos.filter((todo) => todo.status == "completed");
  if (todo.length == todos.length || todos.length == 0) {
    check.innerText = "Uncheck All";
  } else {
    check.innerText = "Check All";
  }
}

function deleteItem(deleteId) {
  todos.splice(deleteId, 1);
  checkedAll();
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodoLists("all");
}

deleteCompleteItem.addEventListener('click', (e) => {
  e.preventDefault();
  todos = todos.filter(todo => todo.status == "active")
  localStorage.setItem('todo-list', JSON.stringify(todos));
  document.getElementById("completed").classList.remove("active");
  document.getElementById("all").classList.add("active");
  showTodoLists("all");
})


function strikeItem(selectItem) {
  let item = selectItem.parentElement.lastElementChild;
  if (selectItem.checked) {
    item.classList.add("checked");
    todos[selectItem.id].status = "completed";

  } else {
    item.classList.remove("checked");
    todos[selectItem.id].status = "active";

  }
  countItem.innerText = todos.filter(data => data.status == "active").length
  checkedAll();
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

let addBtn = document.getElementById('addTodoList');
addBtn.addEventListener('click', e => {
  e.preventDefault();
  let lists = inputValue.value.trim();
  if (lists) {

    if (!todos) {
      todos = [];
    }
    inputValue.value = "";
    let listInfo = { name: lists, status: "active" };
    todos.push(listInfo);
    document.querySelector("button.active").classList.remove("active");
    document.getElementById("all").classList.add("active");
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoLists("all");
  }
});