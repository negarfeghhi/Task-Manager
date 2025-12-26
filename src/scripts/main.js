// Getting the elements
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("closeSidebar");
const addNewTask = document.getElementById("addNewTask-icon")
const addNewTaskBox = document.getElementById("addNewTask-box")
const mainImageWhenNoTask = document.getElementById("when-not-todo")
const newTaskForm = document.getElementById("newTask-form")
const closeTaskBtn = document.getElementById("closeTask")
const chooseTagRightBtn = document.getElementById("chooseTag-right-Btn")
const chooseTagDowntBtn = document.getElementById("chooseTag-down-Btn")
const tagsBox = document.getElementById("tagsBox")
const addTaskBtn = document.getElementById("addTask-btn")
const taskTitle = document.getElementById("taskTitle-inp")
const taskDesc = document.getElementById("taskDesc-inp")
const taskTags = document.querySelectorAll(".tag")
const tasksContainer =document.getElementById('todo-task')

let taskArray = []

let mainTag = ''
  taskTags.forEach(tag => tag.addEventListener('click' , (e) => {
   mainTag = e.target.textContent.trim('')    
  }))

addTaskBtn.addEventListener('click', ()=>{
  
  let title = taskTitle.value
  let desc = taskDesc.value
  let newTaskObj = {
    id:1,
    title,
    desc,
    mainTag,
  }
  
  taskArray.push(newTaskObj)
  generateTasks(taskArray)
  
})

function generateTasks (taskArray) {
  taskArray.forEach(task => {

    let newtaskh1 = document.createElement('h1')
    
    newtaskh1.innerHTML = task.title


    tasksContainer.append(newtaskh1)
  })
}









// Click on elements
document.addEventListener("click", (e) => {

  if (e.target.closest('.open-sidebar')) {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
  }

  if (e.target.closest('.close-sidebar') || e.target === overlay) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }

  if (e.target.closest('.open-task')) {
    addNewTaskBox.classList.add("hidden")
    mainImageWhenNoTask.classList.add("hidden")
    newTaskForm.classList.remove("hidden")
    newTaskForm.classList.add('flex')
  }

  if (e.target.closest('.close-task')) {
    newTaskForm.classList.add("hidden")
    addNewTaskBox.classList.remove("hidden")
    mainImageWhenNoTask.classList.remove("hidden")
  }

  if (e.target.closest('.toggle-tag')) {
    tagsBox.classList.add('flex')
    tagsBox.classList.toggle('hidden')
    chooseTagRightBtn.classList.toggle('hidden')
    chooseTagDowntBtn.classList.toggle('hidden')
  }

})


// Get Date
const formatter = new Intl.DateTimeFormat('fa-IR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  calendar: 'persian',
});

const parts = formatter.formatToParts(new Date());

const map = {};
parts.forEach(p => {
  map[p.type] = p.value;
});

const formattedDate = `${map.weekday}، ${map.day} ${map.month} ${map.year}`;

document.querySelectorAll('.date').forEach(el => {
  el.textContent = formattedDate;
});
