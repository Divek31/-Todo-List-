const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const toggleCheckbox = document.getElementById("toggle-checkbox");
const filterButtons = document.querySelectorAll(".filter-btn");

// Add Task
addButton.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
        const timestamp = new Date().toLocaleString();
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-texts">
              <span class="task-text">${taskText}</span>
              <span class="timestamp">Added: ${timestamp}</span>
            </div>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
        input.value = "";
        saveTasks();
    }
});

// Delete & Complete Task
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.closest("li").remove();
        saveTasks();
    } else if (e.target.classList.contains("task-text")) {
        e.target.classList.toggle("completed");
        saveTasks();
    }
});

// Filter Buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");
        filterTasks(btn.dataset.filter);
    });
});

function filterTasks(type) {
    const items = taskList.querySelectorAll("li");
    items.forEach(li => {
        const isCompleted = li.querySelector(".task-text").classList.contains("completed");
        if (type === "all") li.style.display = "flex";
        else if (type === "completed") li.style.display = isCompleted ? "flex" : "none";
        else li.style.display = !isCompleted ? "flex" : "none";
    });
}

// Save to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector(".task-text").textContent;
        const completed = li.querySelector(".task-text").classList.contains("completed");
        const timestamp = li.querySelector(".timestamp").textContent;
        tasks.push({ text: taskText, completed, timestamp });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-texts">
              <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
              <span class="timestamp">${task.timestamp}</span>
            </div>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Theme toggle
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
    toggleCheckbox.checked = true;
}
toggleCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
});

loadTasks();
