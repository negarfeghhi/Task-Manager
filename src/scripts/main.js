// گرفتن المنت‌ها
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("close-sidebar");

// باز کردن سایدبار
menuBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-full");
  sidebar.classList.add("translate-x-0");

  overlay.classList.remove("hidden");
});

// بستن سایدبار با دکمه X
closeBtn.addEventListener("click", closeSidebar);

// بستن با کلیک روی بک‌گراند تیره
overlay.addEventListener("click", closeSidebar);

// فانکشن بستن
function closeSidebar() {
  sidebar.classList.remove("translate-x-0");
  sidebar.classList.add("translate-x-full");

  overlay.classList.add("hidden");
}


//تاریخ امروز به فارسی و جدا شده
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
