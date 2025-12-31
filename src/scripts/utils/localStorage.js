const STORAGE_KEY = "tasks"; //file name

export function saveTasksToLocal(taskArray) {
  try {
    const serialized = JSON.stringify(taskArray);
    //localStorage.setItem(key, value);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error("Error saving tasks to localStorage:", err);
  }
}

export function loadTasksFromLocal() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return [];
    const parsed = JSON.parse(serialized);

    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error loading tasks from localStorage:", err);
    return [];
  }
}
