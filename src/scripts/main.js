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

let taskArray = [];
let mainTag = "";

taskTags.forEach((tag) =>
  tag.addEventListener("click", (e) => {
    mainTag = e.target.textContent.trim("");
    hideTgs.classList.add("hidden");
    tagsBox.classList.add("hidden");

    const selected = document.getElementById("selected");
    generateSelectedTagBox(mainTag, selected);
  })
);

function updateTodoCounter() {
  const todoCount = taskArray.filter((task) => !task.isDone).length;

  if (todoCount > 0) {
    countTodoTask.innerHTML = `${todoCount} تسک را باید انجام دهید.`;
  } else {
    countTodoTask.innerHTML = "تسکی برای امروز نداری!";
  }
}

function generateSelectedTagBox(selectedTagText, containerElem) {
  containerElem.className =
    "py-[2px] px-[8px] rounded-[4px] font-bold text-xs cursor-pointer justify-center items-center gap-1";
  // containerElem.classList.remove("hidden")
  switch (selectedTagText) {
    case "پایین":
      // containerElem.innerHTML =
      //   '<img src="../assets/icons/close.svg" alt="close" /> پایین';
      containerElem.querySelector(".tag-title").textContent = selectedTagText;
      containerElem.classList.remove("hidden");
      containerElem.classList.add("bg-[#C3FFF1]", "text-[#11A483]", "flex");
      break;
    case "متوسط":
      // containerElem.innerHTML =
      //   '<img src="../assets/icons/close.svg" alt="close" /> متوسط';
      containerElem.querySelector(".tag-title").textContent = selectedTagText;
      containerElem.classList.remove("hidden");
      containerElem.classList.add("bg-[#FFEFD6]", "text-[#FFAF37]", "flex");
      break;
    case "بالا":
      // containerElem.innerHTML =
      //   '<img src="../assets/icons/close.svg" alt="close" /> بالا';
      containerElem.querySelector(".tag-title").textContent = selectedTagText;
      containerElem.classList.remove("hidden");
      containerElem.classList.add("bg-[#FFE2DB]", "text-[#FF5F37]", "flex");
      break;
  }
}

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

  // Add new task
  if (e.target.closest("#addTask-btn")) {
    const taskObj = generateTask();

    showToDoTasks(taskObj);

    selected.classList.add("hidden");
    hideTgs.classList.remove("hidden");
    tagsBox.classList.add("hidden");
    chooseTagDowntBtn.classList.toggle("hidden");
    chooseTagRightBtn.classList.toggle("hidden");
    // countTodoTask.innerHTML = `${taskArray.length} تسک را باید انجام دهید.`;
    updateTodoCounter();
  }
});

// create a new task
function generateTask() {
  const taskTitle = document.getElementById("taskTitle-inp");
  const taskDesc = document.getElementById("taskDesc-inp");

  let title = taskTitle.value;
  let desc = taskDesc.value;

  let newTaskObj = {
    id: Date.now(),
    title,
    desc,
    mainTag,
    isDone: false,
  };

  taskArray.push(newTaskObj);

  taskTitle.value = "";
  taskDesc.value = "";
  mainTag = "";

  return newTaskObj;
}

// Add todo tasks to container
function showToDoTasks(task) {
  const template = document.getElementById("taskTemplate");
  const container = document.getElementById("tasksContainer");

  container.classList.remove("hidden");

  //get new todo task template
  const newTodo = template.cloneNode(true);
  newTodo.classList.add("flex");
  newTodo.classList.remove("hidden");
  newTodo.removeAttribute("id");

  const title = newTodo.querySelector("#newTask-title");
  const desc = newTodo.querySelector("#newTask-desc");
  const tag = newTodo.querySelector("#newTask-tag");
  const color = newTodo.querySelector("#newTask-color");

  // connect this DOM card with the task object
  newTodo.dataset.id = task.id;

  // find checkbox inside this specific task card
  const checkbox = newTodo.querySelector('input[type="checkbox"]');
  if (checkbox) {
    // default value based on task.isDone (initially false)
    checkbox.checked = !!task.isDone;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // مرحله 1 : انیمیشن خروج
        newTodo.classList.add(
          "transition-all",
          "duration-300",
          "ease-out",
          "opacity-0",
          "translate-y-4"
        );

        setTimeout(() => {
          task.isDone = true;
          newTodo.classList.add("hidden");
          moveCompletedTasks();
          updateTodoCounter();
        }, 300);
      } else {
        task.isDone = false;
        newTodo.classList.remove("hidden");
        newTodo.classList.remove("opacity-0", "translate-y-4");
        moveCompletedTasks();
      }
    });
  }

  // click on operators button for each todo task
  const operatorsBtn = newTodo.querySelector(".operators-btn");
  const operatorsBox = newTodo.querySelector(".operators-box");
  operatorsBtn.addEventListener("click", () => {
    operatorsBox.classList.toggle("hidden");
  });
  // click on Delete
  const deleteTaskbtn = newTodo.querySelector(".deleteTask-btn");
  deleteTaskbtn.addEventListener("click", () => {
    operatorsBox.classList.add("hidden");
    newTodo.remove();
  });

  // Click on Edit
  const editTaskbtn = newTodo.querySelector(".editTask-btn");
  const editTemplate = document.getElementById("editTask-template");
  const newEditTemplate = editTemplate.cloneNode(true);
  newEditTemplate.removeAttribute("id");
  newEditTemplate.dataset.id = task.id;

  editTaskbtn.addEventListener("click", () => {
    newEditTemplate.classList.add("flex");
    newEditTemplate.classList.remove("hidden");
    operatorsBox.classList.add("hidden");
    newEditTemplate.querySelector("#editTitle-inp").value = title.textContent;
    newEditTemplate.querySelector("#editDesc-inp").value = desc.textContent;
    const tagelement = newEditTemplate.querySelector("#edit-selectedTag");

    generateSelectedTagBox(tag.textContent, tagelement);

    newTodo.insertAdjacentElement("afterend", newEditTemplate);
  });

  // Click on editTask Btn
  const formEditBtn = newEditTemplate.querySelector("#edit-addTask-btn");
  formEditBtn.addEventListener("click", () => {
    newTodo.querySelector("#newTask-title").textContent =
      newEditTemplate.querySelector("#editTitle-inp").value;
    newTodo.querySelector("#newTask-desc").textContent =
      newEditTemplate.querySelector("#editDesc-inp").value;
    newTodo.querySelector("#newTask-tag").textContent = task.mainTag;

    newEditTemplate.remove();
  });

  ///////////////////////////////////////////////////////
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

//
function moveCompletedTasks() {
  const template = document.getElementById("taskDone");
  if (!template) return;

  const doneContainer = template.parentElement;
  const todoContainer = document.getElementById("tasksContainer");

  // 1) پاک کردن کارت‌های done قبلی
  const oldCards = doneContainer.querySelectorAll(".done-card");
  oldCards.forEach((card) => card.remove());

  // 2) فقط تسک‌هایی که isDone = true هستند
  const doneTasks = taskArray.filter((task) => task.isDone);
  if (doneTasks.length === 0) {
    template.classList.add("hidden");
    return;
  }
  const countTaskDone = document.getElementById("taskDoneCount");
  countTaskDone.innerText = `${doneTasks.length}  تسک انجام شده است .`;

  // 3) برای هر تسک done یک کارت جدید بساز
  doneTasks.forEach((task) => {
    const card = template.cloneNode(true); // کپی کامل کارت
    card.classList.remove("hidden");
    card.removeAttribute("id");
    card.classList.add("done-card");

    // عنوان
    const titleEl = card.querySelector("#titleTaskDone");
    if (titleEl) {
      titleEl.textContent = task.title;
    }

    // رنگ بر اساس mainTag
    const colorEl = card.querySelector("#colorOfTaskDone");
    if (colorEl) {
      colorEl.classList.remove("bg-[#FFAF37]", "bg-[#11A483]", "bg-[#FF5F37]");

      switch (task.mainTag) {
        case "بالا":
          colorEl.classList.add("bg-[#FF5F37]");
          break;
        case "متوسط":
          colorEl.classList.add("bg-[#FFAF37]");
          break;
        case "پایین":
          colorEl.classList.add("bg-[#11A483]");
          break;
      }
    }

    // چک‌باکس داخل کارت انجام‌شده
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = true;

      // ⭐ وقتی از پایین تیک رو برداری، انیمیشنی برگرده بالا
      checkbox.addEventListener("change", () => {
        task.isDone = checkbox.checked;

        if (todoContainer) {
          const mainCard = todoContainer.querySelector(
            `[data-id="${task.id}"]`
          );
          if (mainCard) {
            const topCheckbox = mainCard.querySelector(
              'input[type="checkbox"]'
            );
            if (topCheckbox) {
              topCheckbox.checked = task.isDone;
            }

            if (task.isDone) {
              // وقتی دوباره done شد → بالا قایم بمونه
              mainCard.classList.add("hidden");
            } else {
              // ✅ وقتی از پایین تیک برداشته شد → با انیمیشن برگرده بالا
              mainCard.classList.remove("hidden");

              // شروع حالت انیمیشن (نامرئی و کمی بالا)
              mainCard.classList.add(
                "transition-all",
                "duration-300",
                "ease-out",
                "opacity-0",
                "-translate-y-2"
              );

              // فریم بعدی: برگردون به حالت عادی تا ترنزیشن اجرا بشه
              setTimeout(() => {
                mainCard.classList.remove("opacity-0", "-translate-y-2");
              }, 10);
            }
          }
        }

        moveCompletedTasks();
      });
    }

    // وقتی done است، مطمئن شو کارت بالا مخفی است
    if (todoContainer) {
      const mainCard = todoContainer.querySelector(`[data-id="${task.id}"]`);
      if (mainCard) {
        mainCard.classList.add("hidden");
      }
    }

    doneContainer.appendChild(card);
  });

  // تمپلیت اصلی hidden بماند
  template.classList.add("hidden");
}
//

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
