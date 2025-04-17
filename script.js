const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Add Task
addButton.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
        input.value = "";
        saveTasks();
    }
});

// Delete Task or Toggle Complete
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        e.target.classList.toggle("completed");
        saveTasks();
    }
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

loadTasks();

// Theme toggle
const toggleCheckbox = document.getElementById("toggle-checkbox");
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
