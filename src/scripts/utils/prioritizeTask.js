export function prioritizingTags(priority, container, newTodo) {
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