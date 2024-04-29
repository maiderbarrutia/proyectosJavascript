//MODAL
const createButton = document.getElementById("createTask");
const closeModal = document.getElementById('modalClose');
function showModal() {
    const modal = document.querySelector(".modal");
    modal.style.display= "block"; 
}

function hideModal() {
    const modal = document.querySelector(".modal");
    modal.style.display= "none"; 
}

createButton.addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
});
closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal();
});

//AÑADIR TAREAS
const addTaskButton = document.getElementById("addTask");
let taskListArray = JSON.parse(localStorage.getItem('tasks')) || [];

addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDate = new Date();

    const taskData = {
        name: taskName,
        description: taskDescription,
        date: taskDate.getTime() // Guardar la fecha como un timestamp
    };

    taskListArray.push(taskData);
    saveTaskListToLocalStorage();
    renderTasks();
}

function saveTaskListToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskListArray));
}

function renderTasks() {
    const tasklist = document.getElementById("taskList");
    tasklist.innerHTML = ''; // Limpiar la lista antes de renderizar

    taskListArray.forEach(taskData => {
        const cardElement = createTaskElement(taskData);
        tasklist.appendChild(cardElement);
    });
}

function createTaskElement(taskData) {
    const cardElement = document.createElement('li');
    cardElement.className = 'task';

    const titleElement = document.createElement('h3');
    titleElement.textContent = taskData.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = taskData.description;

    const dateElement = document.createElement('div');
    const taskDate = new Date(taskData.date);
    const año = taskDate.getFullYear();
    const mes = taskDate.getMonth() + 1;
    const dia = taskDate.getDate();
    dateElement.textContent = `${dia}/${mes}/${año}`;

    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(dateElement);

    return cardElement;
}

// Renderizar las tareas existentes al cargar la página
renderTasks();



/*Agrega event listeners para los eventos de arrastrar y soltar en las tarjetas del tablero Kanban.*/

/*Define funciones de manejo de eventos para controlar el inicio, el movimiento y la finalización del arrastre 
de las tarjetas.*/

/*Actualiza la posición de las tarjetas arrastradas en respuesta al movimiento del ratón 
y asegúrate de que se suelten en la posición correcta.*/