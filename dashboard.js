// ==========================
// THEME TOGGLE
// ==========================

const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("theme-dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("theme-dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("theme-dark");
}

// ==========================
// GREETING NAME
// ==========================

function saveName() {
  const name = document.getElementById("name-input").value;
  localStorage.setItem("username", name);
  updateGreeting();
}

function updateGreeting() {
  const name = localStorage.getItem("username") || "Guest";

  document.getElementById("greeting-message").innerText =
    "Hello " + name + "!";
}

updateGreeting();

// ==========================
// CLOCK
// ==========================

function updateClock() {
  const now = new Date();

  document.getElementById("time-display").innerText =
    now.toLocaleTimeString();

  document.getElementById("date-display").innerText =
    now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();

// ==========================
// TASK LIST
// ==========================

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value;

  if (task === "") return;

  const li = document.createElement("li");

  li.className = "task-item";

  li.innerHTML = `
    <input type="checkbox">
    <span class="task-text">${task}</span>
  `;

  taskList.appendChild(li);

  taskInput.value = "";
});

// ==========================
// TIMER
// ==========================

let seconds = 1500;
let interval;

function updateTimer() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;

  document.getElementById("timer-display").innerText =
    m + ":" + (s < 10 ? "0" + s : s);
}

document.getElementById("timer-start").onclick = () => {
  interval = setInterval(() => {
    seconds--;
    updateTimer();

    if (seconds <= 0) clearInterval(interval);
  }, 1000);
};

document.getElementById("timer-stop").onclick = () => {
  clearInterval(interval);
};

document.getElementById("timer-reset").onclick = () => {
  seconds = 1500;
  updateTimer();
};

function changeTime() {
  const minutes = document.getElementById("time-input").value;

  if (minutes > 0) {
    seconds = minutes * 60;
    updateTimer();
  }
}

updateTimer();

// ==========================
// QUICK LINKS
// ==========================

const linkForm = document.getElementById("link-form");
const linkInput = document.getElementById("link-input");
const linksContainer = document.getElementById("links-container");

linkForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = linkInput.value;

  if (url === "") return;

  const a = document.createElement("a");

  a.href = url;
  a.target = "_blank";
  a.className = "link-item";
  a.innerText = url;

  linksContainer.appendChild(a);

  linkInput.value = "";
});