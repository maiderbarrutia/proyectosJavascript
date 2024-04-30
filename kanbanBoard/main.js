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
// Obtener el botón para añadir tareas
const addTaskButton = document.getElementById("addTask");

//Contador id
let idCounter = 0;

// Obtener la lista de tareas del localStorage o inicializarla como un array vacío si no hay datos
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

// Mostrar la lista de tareas existentes al cargar la página
displayExistingTasks();

// Agregar un evento de clic al botón para añadir tareas
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
    hideModal()
});

// Función para crear un elemento de tarea
function createTaskElement(taskData) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
    taskElement.id = taskData.id;

    const titleElement = document.createElement('h3');
    titleElement.textContent = taskData.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = taskData.description;

    const dateElement = document.createElement('div');
    const taskDate = new Date(taskData.date);
    const year = taskDate.getFullYear();
    const month = taskDate.getMonth() + 1;
    const day = taskDate.getDate();
    dateElement.textContent = `${day}/${month}/${year}`;

    const editButton = document.createElement('button');
    editButton.className = "editButton";
    editButton.textContent = "Editar";

    // Agregar evento de clic al botón de editar
    editButton.addEventListener('click', () => {
        editSelectedTask(taskData); 
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "Borrar";

    // Agregar evento de clic al botón de borrar
    deleteButton.addEventListener('click', () => {
        deleteSelectedTask(taskData); 
    });

    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(dateElement);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    return taskElement;
}

// Función para añadir una tarea
function addTask() {
    // Obtener los valores del formulario
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskCategory = document.getElementById('categorySelect').value;

    // Obtener la fecha actual
    const taskDate = new Date();

    // Generar un UUID único para la tarea
    const taskId = generateID();

    // Crear un objeto con los datos de la tarea
    const taskData = {
        id: taskId,
        name: taskName,
        description: taskDescription,
        category: taskCategory,
        date: taskDate.getTime() // Guardar la fecha como un timestamp
    };

    // Añadir el objeto de tarea a la lista de tareas
    taskList.push(taskData);

    // Guardar la lista de tareas actualizada en el localStorage
    saveTaskListToLocalStorage();

    // Mostrar la lista de tareas actualizada
    displayExistingTasks();
    
}

// Función para guardar la lista de tareas en el localStorage
function saveTaskListToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Función para mostrar la lista de tareas existentes
function displayExistingTasks() {
    // Limpiar todas las listas de tareas antes de mostrarlas
    document.querySelectorAll('.taskList').forEach(taskListElement => taskListElement.innerHTML = '');

    // Iterar sobre todas las categorías y mostrar las tareas en sus respectivas columnas
    ['todo', 'inProgress', 'done'].forEach(category => {
        const tasksForCategory = taskList.filter(task => task.category === category);
        const taskListElement = document.querySelector(`#${category} .taskList`);

        if (tasksForCategory.length === 0) {
            // Si no hay tareas en la categoría, mostrar el mensaje "Sin tareas"
            showMessage(category);
        } else {
            // Mostrar las tareas en la lista correspondiente
            tasksForCategory.forEach(taskData => {
                const taskElement = createTaskElement(taskData);
                taskListElement.appendChild(taskElement);
            });
        }
    });
}

function showMessage(category){
    const taskListElement = document.querySelector(`#${category} .taskList`);
    const emptyMessageElement = document.createElement('p');
    emptyMessageElement.textContent = `No hay tareas en la categoría ${category}`;
    emptyMessageElement.className = "empty-message";
    taskListElement.appendChild(emptyMessageElement);
}
function fillEditForm(task) {
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('categorySelect').value = task.category;
}
function editSelectedTask(task) {
    // // Ocultar el botón de "Añadir Tarea"
    addTaskButton.style.display = 'none';
    
    // // Mostrar el botón de "Editar Tarea"
    const taskElement = document.getElementById("addTaskForm");
    const editTaskButton = document.createElement('button');
    editTaskButton.className = "editTaskButton";
    editTaskButton.textContent = "Editar";
    console.log(taskElement)
    taskElement.appendChild(editTaskButton);

    editTaskButton.style.display = 'block';

    // Llenar el formulario con los datos de la tarea seleccionada
    fillEditForm(task);
    
    // Mostrar el modal
    showModal();
    
    // Manejador de evento para el envío del formulario de edición
    const editFormElement = document.querySelector('.modal');
    // if(editFormElement) {
        editFormElement.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar que el formulario se envíe

            // Obtener los nuevos valores del formulario
            const editedTaskName = document.getElementById('taskName').value;
            const editedTaskDescription = document.getElementById('taskDescription').value;
            const editedTaskCategory = document.getElementById('categorySelect').value;

            // Actualizar los datos de la tarea seleccionada
            task.name = editedTaskName;
            task.description = editedTaskDescription;
            task.category = editedTaskCategory;

            // Guardar la lista actualizada en el localStorage
            saveTaskListToLocalStorage();

            // Mostrar la lista de tareas actualizada
            displayExistingTasks();

            // Ocultar el modal
            hideModal();
            
            // Mostrar el botón de "Añadir Tarea" nuevamente
            addTaskButton.style.display = 'block';
            
            // Ocultar el botón de "Editar Tarea"
            editTaskButton.style.display = 'none';
        });
    // }
}

function deleteSelectedTask(task) {
    // Buscar el índice de la tarea en el array de tareas
    const index = taskList.findIndex(element => element.id === task.id);

    // Si se encuentra la tarea en el array, eliminarla
    if (index !== -1) {
        taskList.splice(index, 1); // Eliminar la tarea del array
        saveTaskListToLocalStorage(); // Guardar la lista actualizada en el localStorage
        displayExistingTasks(); // Mostrar la lista de tareas actualizada
    }
}

function generateID() {
    idCounter++; // Incrementar el contador de IDs
    return `id_${idCounter}`; // Devolver un ID único con el prefijo "id_" seguido del número del contador
}











/*Agrega event listeners para los eventos de arrastrar y soltar en las tarjetas del tablero Kanban.*/

/*Define funciones de manejo de eventos para controlar el inicio, el movimiento y la finalización del arrastre 
de las tarjetas.*/

/*Actualiza la posición de las tarjetas arrastradas en respuesta al movimiento del ratón 
y asegúrate de que se suelten en la posición correcta.*/