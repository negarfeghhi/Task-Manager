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

function updateTaskCounter(isDone) {
  const tasks = taskArray.filter((task) => task.isDone === isDone);
  const count = tasks.length;

  if (isDone) {
    const countTaskDone = document.getElementById("taskDoneCount");

    if (count === 0) {
      countTaskDone.innerText = "";
    } else {
      countTaskDone.innerText = `${count} تسک انجام شده است.`;
    }
  } else {
    if (count > 0) {
      countTodoTask.innerHTML = `${count} تسک را باید انجام دهید.`;
    } else {
      countTodoTask.innerHTML = "تسکی برای امروز نداری!";
    }
  }
}

function generateSelectedTagBox(selectedTagText, containerElem) {
  containerElem.classList.remove("hidden");
  containerElem.querySelector(".tag-title").textContent = selectedTagText;
  applyTagStyle(selectedTagText, containerElem);
}

function applyTagStyle(tagName, tag, color) {
  if (!tagName) return;
  tag.classList.remove("bg-[#C3FFF1]","bg-[#FFEFD6]","bg-[#FFE2DB]","text-[#11A483]","text-[#FFAF37]","text-[#FF5F37]","flex");
  color?.classList.remove("bg-[#11A483]", "bg-[#FFAF37]", "bg-[#FF5F37]");
  tag.classList.add("rounded-[4px]", "font-bold","text-xs", "py-[2px]", "px-[8px]", "flex", "items-center", "gap-1" );
  const title = tag.querySelector(".tag-title");
  if (title) {
    title.textContent = tagName;
  }
  switch (tagName) {
    case "پایین":
      tag.classList.add("bg-[#C3FFF1]", "text-[#11A483]");
      color?.classList.add("bg-[#11A483]");
      break;

    case "متوسط":
      tag.classList.add("bg-[#FFEFD6]", "text-[#FFAF37]");
      color?.classList.add("bg-[#FFAF37]");
      break;

    case "بالا":
      tag.classList.add("bg-[#FFE2DB]", "text-[#FF5F37]");
      color?.classList.add("bg-[#FF5F37]");
      break;
  }
}

function prioritizingTags(priority, container, newTodo) {
  switch (priority) {
    case "پایین":
      container.insertAdjacentElement("beforeend", newTodo);
      break;
    case "متوسط": {
      const firstLow = Array.from(container.children).find((current) => {
        const findElement = current.querySelector(".newTask-tag");
        const title = findElement?.querySelector(".tag-title");
        return title && title.textContent === "پایین";
      });

      if (firstLow) {
        firstLow.insertAdjacentElement("beforebegin", newTodo);
      } else {
        container.appendChild(newTodo);
      }
      break;
    }

    case "بالا":
      container.insertAdjacentElement("afterbegin", newTodo);
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
    updateTaskCounter(false);
    updateTaskCounter(true);
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
  const tag = newTodo.querySelector(".newTask-tag");
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
          updateTaskCounter(false);
          updateTaskCounter(true);
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

    // generateSelectedTagBox(tag.textContent, tagelement);
    const tagTitle = tag.querySelector(".tag-title")?.textContent;
    generateSelectedTagBox(tagTitle, tagelement);

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
  title.textContent = task.title;
  desc.textContent = task.desc;
  applyTagStyle(task.mainTag, tag, color);
  prioritizingTags(task.mainTag, container, newTodo);
}

function moveCompletedTasks() {
  const container = document.getElementById("completedTasksContainer");
  const template = document.getElementById("taskDoneTemplate");
  const doneTasks = taskArray.filter((task) => task.isDone);
  const todoContainer = document.getElementById("tasksContainer");
  if (!container || !template) return;
  container.innerHTML = "";

  if (doneTasks.length === 0) {
    updateTaskCounter(false);
    updateTaskCounter(true);
    return;
  }

  //Create a new card for each task completed.
  doneTasks.forEach((task) => {
    const card = template.cloneNode(true);
    card.classList.remove("hidden");
    card.removeAttribute("id");
    card.classList.add("done-card");

    // title
    const titleEl = card.querySelector("#titleTaskDone");
    if (titleEl) {
      titleEl.textContent = task.title;
    }

    //Color based on mainTag
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

    // Checkbox inside the card is done.
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = true;

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
              mainCard.classList.add("hidden");
            } else {
              mainCard.classList.remove("hidden");
              mainCard.classList.add(
                "transition-all",
                "duration-300",
                "ease-out",
                "opacity-0",
                "-translate-y-2"
              );

              setTimeout(() => {
                mainCard.classList.remove("opacity-0", "-translate-y-2");
              }, 10);
            }
          }
        }

        moveCompletedTasks();
      });
    }

    //When done, make sure the top card is hidden.
    if (todoContainer) {
      const mainCard = todoContainer.querySelector(`[data-id="${task.id}"]`);
      if (mainCard) {
        mainCard.classList.add("hidden");
      }
    }

    container.appendChild(card);
  });
  updateTaskCounter(false);
  updateTaskCounter(true);
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
