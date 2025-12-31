import { applyTagStyle } from "./utils/tagStyles.js";
import { applyDoneTaskColor } from "./utils/doneTaskStyle.js";
import { prioritizingTags } from "./utils/prioritizeTask.js";
import { saveTasksToLocal, loadTasksFromLocal } from "./utils/localStorage.js";

const taskTags = document.querySelectorAll(".tag");
const hideTgs = document.getElementById("hideTgs");
const tagsBox = document.getElementById("tagsBox");
const countTodoTask = document.getElementById("count-todo-task");
const mainImageWhenNoTask = document.getElementById("when-not-todo");

let taskArray = loadTasksFromLocal();
let mainTag = "";

if (taskArray.length) {
    if (mainImageWhenNoTask) {
        mainImageWhenNoTask.classList.add("hidden");
    }

    taskArray.forEach((task) => {
        showToDoTasks(task);
    });

    moveCompletedTasks();
    updateTaskCounter(false);
    updateTaskCounter(true);
}

taskTags.forEach((tag) =>
    tag.addEventListener("click", (e) => {
        mainTag = e.target.textContent.trim("");
        hideTgs.classList.add("hidden");
        tagsBox.classList.add("hidden");

        const selected = document.getElementById("selected");
        generateSelectedTagBox(mainTag, selected);
    })
);

// create a new task
export function generateTask() {
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
    saveTasksToLocal(taskArray);
        if (mainImageWhenNoTask) {
        mainImageWhenNoTask.classList.add("hidden");
    }
    taskTitle.value = "";
    taskDesc.value = "";
    mainTag = "";

    return newTaskObj;
}

// Add todo tasks to container
export function showToDoTasks(task) {
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
                    saveTasksToLocal(taskArray);
                }, 300);
            } else {
                task.isDone = false;
                newTodo.classList.remove("hidden");
                newTodo.classList.remove("opacity-0", "translate-y-4");
                moveCompletedTasks();
                updateTaskCounter(false);
                updateTaskCounter(true);
                saveTasksToLocal(taskArray);
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

        taskArray = taskArray.filter((t) => t.id !== task.id);
        updateTaskCounter(false);
        updateTaskCounter(true);
        saveTasksToLocal(taskArray);
        
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
        newEditTemplate.querySelector("#editTitle-inp").value =
            title.textContent;
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

// update count of done and undone tasks
export function updateTaskCounter(isDone) {
    const count = taskArray.filter((task) => task.isDone === isDone).length;

    if (isDone) {
        const countTaskDone = document.getElementById("taskDoneCount");
        if (count === 0) countTaskDone.innerText = "";
        else countTaskDone.innerText = `${count} تسک انجام شده است.`;
    } else {
        if (count > 0)
            countTodoTask.innerHTML = `${count} تسک را باید انجام دهید.`;
        else countTodoTask.innerHTML = "تسکی برای امروز نداری!";
    }
}

//generate a box of selected tag after choosing
export function generateSelectedTagBox(selectedTagText, containerElem) {
    containerElem.classList.remove("hidden");
    containerElem.querySelector(".tag-title").textContent = selectedTagText;
    applyTagStyle(selectedTagText, containerElem);
}

// show done tasks on container
export function moveCompletedTasks() {
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

        //set Color based on mainTag to container of done task

        const colorEl = card.querySelector("#colorOfTaskDone");
        applyDoneTaskColor(colorEl, task.mainTag);

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
                                mainCard.classList.remove(
                                    "opacity-0",
                                    "-translate-y-2"
                                );
                            }, 10);
                        }
                    }
                }

                moveCompletedTasks();
                updateTaskCounter(false);
                updateTaskCounter(true);
                saveTasksToLocal(taskArray);
            });
        }

        //When done, make sure the top card is hidden.
        if (todoContainer) {
            const mainCard = todoContainer.querySelector(
                `[data-id="${task.id}"]`
            );
            if (mainCard) {
                mainCard.classList.add("hidden");
            }
        }

        container.appendChild(card);
    });
    updateTaskCounter(false);
    updateTaskCounter(true);
}
