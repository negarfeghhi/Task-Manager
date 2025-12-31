const STORAGE_KEY = "tasks"; 

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
