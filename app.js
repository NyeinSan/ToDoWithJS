let inputValue = document.getElementById("todoInput");
let check = document.getElementById("check-alert");
let todoBox = document.querySelector(".todo-Box");
let filters = document.querySelectorAll(".filters button");
let deleteCompleteItem = document.getElementById("clearItem");
let todos = JSON.parse(localStorage.getItem("todo-list"));


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
      check.innerText = "Check All";
      //count(); 
    });
  }
  todoBox.innerHTML = liLists;
}
showTodoLists("all");

function count() {
  countItem = todos.filter(todo => todo.status == "active").length;
  document.querySelector("#count").innerText = countItem + " " + "items left";
}


check.addEventListener('click', (e) => {
 
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  var spanChecked = document.querySelector('.checkAlert').nextElementSibling;
  checkboxes.forEach((checkbox, index) => {
    console.log( todos[index].status);
  

    if (checkbox.checked) {
      
     checkbox.removeAttribute('checked');
     checkbox.nextElementSibling.classList.remove("checked");
      check.innerText = "Check All";
      
    }
    else {
      checkbox.setAttribute('checked', 'checked');
      checkbox.nextElementSibling.classList.add("checked");
      check.innerText = "Uncheck All";
    }
    
  });
  localStorage.setItem("todo-list", JSON.stringify(todos));
  //showTodoLists();
});

function deleteItem(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodoLists("all");
}

deleteCompleteItem.addEventListener('click', (e) => {
  e.preventDefault();
  todos = todos.filter(todo => todo.status == "active")
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodoLists();
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
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoLists("all");
  }
});