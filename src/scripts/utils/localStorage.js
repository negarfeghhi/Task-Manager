document.addEventListener("DOMContentLoaded", () => {
  //Apply saved theme on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  //Clicking on buttons (saved to LocalStorage)
  document.addEventListener("click", (e) => {
    // dark mode
    if (e.target.closest(".darkBtn")) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    // light mode
    if (e.target.closest(".lightBtn")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
});

const STORAGE_KEY = "tasks"; //file name

export function saveTasksToLocal(taskArray) {
  const serialized = JSON.stringify(taskArray);
  localStorage.setItem(STORAGE_KEY, serialized);
}

export function loadTasksFromLocal() {
  const serialized = localStorage.getItem(STORAGE_KEY);
  if (!serialized) return [];
  const parsed = JSON.parse(serialized);
  return parsed ? parsed : [];
}
