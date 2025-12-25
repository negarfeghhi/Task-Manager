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

<<<<<<< HEAD
// Open sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("translate-x-0");
  overlay.classList.remove("hidden");
});

// Close the sidebar with the X button
closeBtn.addEventListener("click", closeSidebar);

// Close by clicking on the dark background
overlay.addEventListener("click", closeSidebar);
=======

// Click on elements
document.addEventListener("click", (e) => {

  if (e.target.closest('.open-sidebar')) {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
  }
>>>>>>> 24c6365c2679c25e607d785c9e53f2ae3fb3eb28

  if (e.target.closest('.close-sidebar') || e.target === overlay) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }

  if (e.target.closest('.open-task')) {
    addNewTaskBox.classList.add("hidden")
    mainImageWhenNoTask.classList.add("hidden")
    newTaskForm.classList.remove("hidden")
  }

  if (e.target.closest('.close-task')) {
    newTaskForm.classList.add("hidden")
    addNewTaskBox.classList.remove("hidden")
    mainImageWhenNoTask.classList.remove("hidden")
  }

  if (e.target.closest('.toggle-tag')) {
    tagsBox.classList.toggle('hidden')
    chooseTagRightBtn.classList.toggle('hidden')
    chooseTagDowntBtn.classList.toggle('hidden')
  }

<<<<<<< HEAD
// Close function
function closeSidebar() {
  sidebar.classList.remove("translate-x-0");
  sidebar.classList.add("translate-x-full");

  overlay.classList.add("hidden");
}

// function for opening new task form and close addingtaskbox and image
function openNewTaskForm() {
  addNewTaskBox.classList.add("hidden")
  mainImageWhenNoTask.classList.add("hidden")
  newTaskForm.classList.remove("hidden")
}


// function for closing task form
function closeTaskForm() {
  newTaskForm.classList.add("hidden")
  addNewTaskBox.classList.remove("hidden")
  mainImageWhenNoTask.classList.remove("hidden")
}

//function for opening tag box
function chooseTag() {
  tagsBox.classList.remove('hidden')
  chooseTagRightBtn.classList.add('hidden')
  chooseTagDowntBtn.classList.remove('hidden')

}

//function for closing tag box
function closeTagBox() {
  tagsBox.classList.add('hidden')
  chooseTagDowntBtn.classList.add('hidden')
  chooseTagRightBtn.classList.remove('hidden')
}

// Today's date in Persian and separated
=======
})


// Get Date
>>>>>>> 24c6365c2679c25e607d785c9e53f2ae3fb3eb28
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
