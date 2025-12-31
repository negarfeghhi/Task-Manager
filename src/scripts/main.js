import { getTime } from "./utils/dateFormatter.js";
import { generateTask, showToDoTasks, updateTaskCounter , generateSelectedTagBox, moveCompletedTasks} from "./func.js";
import "./dom.js"

// Get the elements

const chooseTagRightBtn = document.getElementById("chooseTag-right-Btn");
const chooseTagDowntBtn = document.getElementById("chooseTag-down-Btn");
const tagsBox = document.getElementById("tagsBox");
const addTaskBtn = document.getElementById("addTask-btn");
const hideTgs = document.getElementById("hideTgs");
const selected = document.getElementById("selected");


  addTaskBtn.addEventListener('click',()=>{
        const taskObj = generateTask();

    showToDoTasks(taskObj);

    selected.classList.add("hidden");
    hideTgs.classList.remove("hidden");
    tagsBox.classList.add("hidden");
    chooseTagDowntBtn.classList.toggle("hidden");
    chooseTagRightBtn.classList.toggle("hidden");
    updateTaskCounter(false);
    updateTaskCounter(true);
  })


//get time for sideBar

getTime()
