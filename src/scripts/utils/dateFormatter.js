// Get Date
export function getTime() {
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
}