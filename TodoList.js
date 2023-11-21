const TOAST_TYPES = {
    success: "success",
    error: "error",
};

const TIME = {
    _3_SECOND: 3 * 1000
}

const STATUS = {
    _ADD: "add",
    _EDIT: "edit",
    _ADD_NUM: -1,
};

const todos = [];
let currentEditIndex = STATUS._ADD_NUM;

const toastSoundSuccess = document.getElementById("toastSoundSuccess");
const toastSoundError = document.getElementById("toastSoundError");

const renderTodoList = () => {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.innerHTML = `
      <span>${todo}</span>
      <div>
          <button class="btn btn-primary" onclick="openPopup('edit', ${index})">Edit</button>
          <button class="btn btn-danger" onclick="deleteTodo(${index})">Delete</button>
      </div>
      `;
        todoList.appendChild(listItem);
    });
};

const openPopup = (action = STATUS._ADD, index = STATUS._ADD_NUM) => {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const todoText = document.getElementById("todo-text");

    if (action === STATUS._ADD) {
        popupTitle.innerText = "Add Todo";
        todoText.value = "";
        currentEditIndex = STATUS._ADD_NUM;
    } else {
        popupTitle.innerText = "Edit Todo";
        todoText.value = todos[index];
        currentEditIndex = index;
    }

    popup.style.display = "flex";
};

const closePopup = () => {
    const popup = document.getElementById("popup");

    popup.style.display = "none";
};

const saveTodo = () => {
    const todoText = document.getElementById("todo-text").value;

    if (todoText === "") {
        ToastError("Please enter input 🙃")
        return toastSoundError.play();
    }

    // Step 1: Add Todo
    const handelCheckType = currentEditIndex !== STATUS._ADD_NUM
    if (handelCheckType) {
        return saveEdit(currentEditIndex)
    }

    todos.push(todoText);
    ToastSuccess(`Add Todo success ✅`)

    toastSoundSuccess.play();
    closePopupAndRenderList()
};

const saveEdit = (currentEditIndex) => {
    const todoText = document.getElementById("todo-text").value;

    todos[currentEditIndex] = todoText
    ToastSuccess(`Edit ${todoText} Success 😂`)
    toastSoundSuccess.play();
    closePopupAndRenderList()
}

const closePopupAndRenderList = () => {
    closePopup();
    renderTodoList();
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    toastSoundSuccess.play();
    renderTodoList();
};

const showToast = (message, type) => {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "toast";

    switch (type) {
        case TOAST_TYPES.success:
            toast.classList.add("success");
            break;
        case TOAST_TYPES.error:
            toast.classList.add("error");
            break;
        default:
            break;
    }

    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, TIME._3_SECOND);
};

const ToastError = (message) => {
    showToast(message, TOAST_TYPES.error);
};

const ToastSuccess = (message) => {
    showToast(message, TOAST_TYPES.success);
};


renderTodoList();
