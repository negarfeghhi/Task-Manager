export function prioritizingTags(priority, container, newTodo) {
  switch (priority) {
    case "بالا":
      container.insertAdjacentElement("afterbegin", newTodo);
      break;
    case "متوسط": {
      const tasks = Array.from(container.children);
      const lastHigh = tasks
        .filter((el) => {
          const tag = el.querySelector(".tag-title")?.textContent;
          return tag === "بالا";
        })
        .pop();

      if (lastHigh) {
        lastHigh.insertAdjacentElement("afterend", newTodo);
        break;
      }
      const firstLow = tasks.find((el) => {
        const tag = el.querySelector(".tag-title")?.textContent;
        return tag === "پایین";
      });

      if (firstLow) {
        firstLow.insertAdjacentElement("beforebegin", newTodo);
      } else {
        container.appendChild(newTodo);
      }
      break;
    }
    case "پایین":
      container.appendChild(newTodo);
      break;
  }
}
