let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");


saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getsaveTodoList() {
    let getTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(getTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getsaveTodoList();



let todoCount = todoList.length;

function onTodoStatusChanged(inputId, labelId, todoId) {
    let checkboxElement = document.getElementById(inputId);
    let labelElement = document.getElementById(labelId);
    let todoElement = document.getElementById(todoId);
    labelElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = "todo" + eachItem.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let toDoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(toDoElement);
    //todoList.pop(toDoElement);
    //todoList.splice(l,1);
    let deletedTodoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    //console.log(deletedTodoItemIndex);
    todoList.splice(deletedTodoItemIndex, 1);
}

function createAndAppendContainer(todoList) {
    let inputId = "checkBox" + todoList.uniqueId;
    let labelId = "label" + todoList.uniqueId;
    let todoId = "todo" + todoList.uniqueId;

    let todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement('input');
    inputElement.classList.add("checkbox-input");
    inputElement.type = "checkbox";
    inputElement.id = inputId;
    inputElement.checked = todoList.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChanged(inputId, labelId, todoId);
    }

    todoElement.appendChild(inputElement);

    let divElement = document.createElement('div');
    divElement.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(divElement);

    let labelElement = document.createElement("label");
    labelElement.setAttribute('for', inputId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todoList.text;
    if (todoList.isChecked === true) {
        labelElement.classList.add("checked");
    }
    divElement.appendChild(labelElement);

    let innerDivElement = document.createElement("div");
    innerDivElement.classList.add("delete-icon-container");
    divElement.appendChild(innerDivElement);

    let iElement = document.createElement('i');
    iElement.onclick = function() {
        onDeleteTodo(todoId);
    }
    iElement.classList.add("far", "fa-trash-alt", "delete-icon");
    innerDivElement.appendChild(iElement);

    console.log(todoItemsContainer);
}

for (let item of todoList) {
    createAndAppendContainer(item);
}

function onAddTodo() {
    let createTaskInput = document.getElementById("todoUserInput");
    let createTaskInputValue = createTaskInput.value;
    if (createTaskInputValue === "") {
        alert("Please enter a valid text.");
        return;
    }
    let newTodo = {
        text: createTaskInputValue,
        uniqueId: todoCount + 1,
        isChecked: false
    }
    todoList.push(newTodo);
    createAndAppendContainer(newTodo);
    createTaskInput.value = "";
}


let addTodoButton = document.getElementById("addButton");
addTodoButton.onclick = function() {
    onAddTodo();
}