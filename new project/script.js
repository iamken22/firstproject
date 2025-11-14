// Sélecteurs
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Charger les tâches au démarrage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
displayTasks();

// Ajouter une tâche
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();

    taskInput.value = "";
}

// Affichage des tâches
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));

        // Texte
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.5";
        }

        // Bouton supprimer
        const btn = document.createElement("button");
        btn.textContent = "Supprimer";
        btn.className = "delete-btn";
        btn.addEventListener("click", () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btn);

        taskList.appendChild(li);
    });

    updateCount();
}

// Marquer une tâche comme terminée
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    displayTasks();
}

// Supprimer une tâche
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

// Sauvegarde
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mise à jour du compteur
function updateCount() {
    taskCount.textContent = tasks.length;
}