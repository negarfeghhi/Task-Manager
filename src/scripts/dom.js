// Getting the elements
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("closeSidebar");
const addNewTask = document.getElementById("addNewTask-icon");
const addNewTaskBox = document.getElementById("addNewTask-box");
const mainImageWhenNoTask = document.getElementById("when-not-todo");
const newTaskForm = document.getElementById("newTask-form");
const closeTaskBtn = document.getElementById("closeTask");
const chooseTagRightBtn = document.getElementById("chooseTag-right-Btn");
const chooseTagDowntBtn = document.getElementById("chooseTag-down-Btn");
const tagsBox = document.getElementById("tagsBox");
const addTaskBtn = document.getElementById("addTask-btn");
const taskTags = document.querySelectorAll(".tag");
const tasksContainer = document.getElementById("todo-task");
const countTodoTask = document.getElementById("count-todo-task");
const hideTgs = document.getElementById("hideTgs");



// Click on elements

// Open sideBar
document.addEventListener("click", (e) => {
  if (e.target.closest(".open-sidebar")) {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
  }

  // Close sideBar
  if (e.target.closest(".close-sidebar") || e.target === overlay) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }

  // Open new task form
  if (e.target.closest(".open-task")) {
    addNewTaskBox.classList.add("hidden");
    mainImageWhenNoTask.classList.add("hidden");
    newTaskForm.classList.remove("hidden");
    newTaskForm.classList.add("flex");
  }

  // Close new task form
  if (e.target.closest(".close-task")) {
    newTaskForm.classList.add("hidden");
    addNewTaskBox.classList.remove("hidden");
    mainImageWhenNoTask.classList.remove("hidden");
  }

  // Open and close tags box
  if (e.target.closest(".toggle-tag")) {
    tagsBox.classList.add("flex");
    tagsBox.classList.toggle("hidden");
    chooseTagRightBtn.classList.toggle("hidden");
    chooseTagDowntBtn.classList.toggle("hidden");
  }

  // dark mode
  if (e.target.closest(".darkBtn")) {
    document.documentElement.classList.add("dark");
  }

  // light mode
  if (e.target.closest(".lightBtn")) {
    document.documentElement.classList.remove("dark");
  }
});