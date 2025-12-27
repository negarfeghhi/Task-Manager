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
const taskTitle = document.getElementById("taskTitle-inp");
const taskDesc = document.getElementById("taskDesc-inp");
const taskTags = document.querySelectorAll(".tag");
const tasksContainer = document.getElementById("todo-task");
const countTodoTask = document.getElementById("count-todo-task");
const hideTgs = document.getElementById("hideTgs");
const selected = document.getElementById("selected");
let taskArray = [];

let mainTag = "";
taskTags.forEach((tag) =>
  tag.addEventListener("click", (e) => {
    mainTag = e.target.textContent.trim("");
    hideTgs.classList.add("hidden");
    tagsBox.classList.add("hidden");
    selected.className =
      "py-[2px] px-[8px] rounded-[4px] font-bold text-xs cursor-pointer justify-center items-center gap-1";
    switch (mainTag) {
      case "پایین":
        selected.innerHTML =
          '<img src="../assets/icons/close.svg" alt="close" /> پایین';
        selected.classList.remove("hidden");
        selected.classList.add("bg-[#C3FFF1]", "text-[#11A483]", "flex");
        break;
      case "متوسط":
        selected.innerHTML =
          '<img src="../assets/icons/close.svg" alt="close" /> متوسط';
        selected.classList.remove("hidden");
        selected.classList.add("bg-[#FFEFD6]", "text-[#FFAF37]", "flex");
        break;
      case "بالا":
        selected.innerHTML =
          '<img src="../assets/icons/close.svg" alt="close" /> بالا';
        selected.classList.remove("hidden");
        selected.classList.add("bg-[#FFE2DB]", "text-[#FF5F37]", "flex");
        break;
    }
  })
);

// Click on elements
document.addEventListener("click", (e) => {
  if (e.target.closest(".open-sidebar")) {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
  }

  if (e.target.closest(".close-sidebar") || e.target === overlay) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }

  if (e.target.closest(".open-task")) {
    addNewTaskBox.classList.add("hidden");
    mainImageWhenNoTask.classList.add("hidden");
    newTaskForm.classList.remove("hidden");
    newTaskForm.classList.add("flex");
  }

  if (e.target.closest(".close-task")) {
    newTaskForm.classList.add("hidden");
    addNewTaskBox.classList.remove("hidden");
    mainImageWhenNoTask.classList.remove("hidden");
  }

  if (e.target.closest(".toggle-tag")) {
    tagsBox.classList.add("flex");
    tagsBox.classList.toggle("hidden");
    chooseTagRightBtn.classList.toggle("hidden");
    chooseTagDowntBtn.classList.toggle("hidden");
  }

  if (e.target.closest("#addTask-btn")) {
    let title = taskTitle.value;
    let desc = taskDesc.value;
    let newTaskObj = {
      id: Date.now(),
      title,
      desc,
      mainTag,
    };
    taskArray.push(newTaskObj);
    generateTasks(newTaskObj);
    taskTitle.value = "";
    taskDesc.value = "";
    mainTag = "";
    selected.classList.add("hidden");
    hideTgs.classList.remove("hidden");
    tagsBox.classList.add("hidden");
    chooseTagDowntBtn.classList.toggle("hidden");
    chooseTagRightBtn.classList.toggle("hidden");
    countTodoTask.innerHTML = `${taskArray.length} تسک را باید انجام دهید.`;
  }
});

//for adding new tasks that need to be done
function generateTasks(task) {
  const template = document.getElementById("taskTemplate");
  const container = document.getElementById("tasksContainer");

  container.classList.remove("hidden");

  // new template
  const newTodo = template.cloneNode(true);
  newTodo.classList.add("flex");
  newTodo.classList.remove("hidden");
  newTodo.removeAttribute("id");

  const title = newTodo.querySelector("#newTask-title");
  const desc = newTodo.querySelector("#newTask-desc");
  const tag = newTodo.querySelector("#newTask-tag");
  const color = newTodo.querySelector("#newTask-color");

  title.textContent = task.title;
  desc.textContent = task.desc;
  tag.textContent = task.mainTag;

  color.className = "w-[4px] h-[50px] rounded-tl-[8px] rounded-bl-[8px]";
  tag.className = "rounded-[4px] font-bold text-xs py-[2px] px-[8px]";

  switch (task.mainTag) {
    case "پایین":
      color.classList.add("bg-[#11A483]");
      tag.classList.add("bg-[#C3FFF1]", "text-[#11A483]");
      container.insertAdjacentElement("beforeend", newTodo);
      break;
    case "متوسط":
      color.classList.add("bg-[#FFAF37]");
      tag.classList.add("bg-[#FFEFD6]", "text-[#FFAF37]");
      const firstLow = Array.from(container.children).find((current) => {
        const findElement = current.querySelector("#newTask-tag");
        return findElement && findElement.textContent === "پایین";
      });
      if (firstLow) {
        firstLow.insertAdjacentElement("beforebegin", newTodo);
      } else {
        container.appendChild(newTodo);
      }
      break;
    case "بالا":
      color.classList.add("bg-[#FF5F37]");
      tag.classList.add("bg-[#FFE2DB]", "text-[#FF5F37]");
      container.insertAdjacentElement("afterbegin", newTodo);
      break;
  }
}

// Get Date
const formatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  calendar: "persian",
});

const parts = formatter.formatToParts(new Date());

const map = {};
parts.forEach((p) => {
  map[p.type] = p.value;
});

const formattedDate = `${map.weekday}، ${map.day} ${map.month} ${map.year}`;

document.querySelectorAll(".date").forEach((el) => {
  el.textContent = formattedDate;
});
