// Function to load tasks from localStorage and display them
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : []; // Parse stored JSON or return empty array

    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = ''; // Clear any existing tasks on page load

    tasks.forEach(task => {
        addTaskToList(task.task, task.id); // Add each task from localStorage to the list
    });
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks as JSON string
}

// Function to add a new task to the list
function add() {
    const taskInput = document.getElementById('input-ToDo');
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const tasks = getTasksFromLocalStorage(); // Get existing tasks
        const newTask = {
            task: taskValue,
            id: Date.now() // Use timestamp as unique ID
        };
        
        tasks.push(newTask); // Add new task to tasks array
        saveTasks(tasks); // Save updated tasks to localStorage

        addTaskToList(taskValue, newTask.id); // Display the new task on the UI
        taskInput.value = '';  // Clear input field
    } else {
        alert('Please enter your task.');
    }
}

// Helper function to get tasks from localStorage
function getTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : []; // Return parsed tasks or empty array
}

// Function to add task item to the list
function addTaskToList(taskValue, taskId) {
    const listContainer = document.getElementById('list-container');

    const li = document.createElement('li');
    li.textContent = taskValue;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
        deleteTask(taskId, li); // Delete task when button is clicked
    };

    li.appendChild(deleteButton);
    listContainer.appendChild(li);
}

// Function to delete a task from both the UI and localStorage
function deleteTask(taskId, li) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId); // Remove task with matching ID
    saveTasks(updatedTasks); // Save updated tasks to localStorage
    li.remove(); // Remove task from the UI
}

// Load tasks when the page loads
window.onload = loadTasks;
