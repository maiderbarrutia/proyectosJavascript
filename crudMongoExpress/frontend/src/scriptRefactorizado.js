const formElements = {
    userForm: document.getElementById('userForm'),
    taskForm: document.getElementById('taskForm'),
    userList: document.getElementById('userList'),
    taskList: document.getElementById('taskList'),
    assignedToSelect: document.getElementById('assignedTo')
};

// Función para agregar un usuario a la lista
function addUserToList(user) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${user.name} ${user.surname} (${user.email})</span>
        <button class="editUserButton" data-user-id="${user._id}" onclick="updateUser('${user._id}')">Editar</button>
        <button class="deleteUserButton" data-user-id="${user._id}" onclick="deleteUser('${user._id}')">Eliminar</button>
    `;
    formElements.userList.appendChild(listItem);
}

// Función para agregar un usuario al select de asignación
function addUserToSelect(user) {
    const option = document.createElement('option');
    option.value = user._id;
    option.textContent = `${user.name} ${user.surname} (${user.email})`;
    formElements.assignedToSelect.appendChild(option);
}

// Función para cargar la lista de usuarios
async function loadListUsers() {
    try {
        const response = await fetch('http://localhost:3303/users');
        const users = await response.json();
        formElements.userList.innerHTML = '';
        users.forEach(user => {
            addUserToList(user);
            addUserToSelect(user);
        });
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
    }
}

// Función para cargar la lista de tareas
async function loadTaskList() {
    try {
        const response = await fetch('http://localhost:3303/tasks');
        const tasks = await response.json();
        formElements.taskList.innerHTML = '';
        tasks.forEach(task => {
            addTaskToList(task);
        });
    } catch (error) {
        console.error('Error al obtener la lista de tareas:', error);
    }
}

// Función para agregar una tarea a la lista
function addTaskToList(task) {
    const assignedTo = task.assignedTo ? `${task.assignedTo.name} ${task.assignedTo.surname} (${task.assignedTo.email})` : 'No asignado';
    const listItem = document.createElement('li');
    
    listItem.innerHTML = `
        <span>${task.title} - ${task.description} (Asignado a: ${assignedTo})</span>
        <button class="editTaskButton" data-task-id="${task._id}" onclick='updateTask(${JSON.stringify(task)})'>Editar</button>
        <button class="deleteTaskButton" data-task-id="${task._id}" onclick="deleteTask('${task._id}')">Eliminar</button>
    `;
    formElements.taskList.appendChild(listItem);
}
async function updateTask(task) {
    // Obtener el modal y sus componentes
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const deadlineInput = document.getElementById('deadline');
    const assignedToInput = document.getElementById('assignedTo');
    const taskFormButton = document.querySelector("#taskForm button");
    taskFormButton.textContent = "Actualizar";

    // Poblar el formulario con los datos de la tarea
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    deadlineInput.value = new Date(task.deadline).toISOString().split('T')[0];
    assignedToInput.value = task.assignedTo ? task.assignedTo._id : '';

    // Escuchar el evento de clic en el botón de guardar
    taskFormButton.onclick = () => {
        // Obtener los nuevos valores del formulario
        const newTitle = titleInput.value;
        const newDescription = descriptionInput.value;
        const newDeadline = deadlineInput.value;
        const newAssignedTo = assignedToInput.value;

        // Realizar la solicitud de actualización
        fetch(`http://localhost:3303/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                deadline: newDeadline,
                assignedTo: newAssignedTo
            })
        })
        
        .then(response => {
            if (response.ok) {
                // Actualizar la lista de tareas con los datos de la tarea actualizados
                // response.json().then(updatedTask => {
                //     const taskListItem = document.querySelector(`.editTaskButton[data-task-id="${updatedTask._id}"]`).closest('li');
                //     taskListItem.innerHTML = `
                //         <span>${updatedTask.title} - ${updatedTask.description} (Asignado a: ${updatedTask.assignedTo ? updatedTask.assignedTo.name + ' ' + updatedTask.assignedTo.surname + ' (' + updatedTask.assignedTo.email + ')' : 'No asignado'})</span>
                //         <button class="editTaskButton" data-task-id="${updatedTask._id}" onclick='updateTask(${JSON.stringify(updatedTask)})'>Editar</button>
                //         <button class="deleteTaskButton" data-task-id="${updatedTask._id}" onclick="deleteTask('${updatedTask._id}')">Eliminar</button>
                //     `;
                // });
                location.reload();
                // Limpiar los campos del formulario
                titleInput.value = "";
                descriptionInput.value = "";
                deadlineInput.value = "";
                assignedToInput.value = "";
            }
        })
        .catch(error => console.error('Error al actualizar la tarea:', error));
    };
}


function deleteTask(taskId) {
    fetch(`http://localhost:3303/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            const taskListItem = document.querySelector(`.deleteTaskButton[data-task-id="${taskId}"]`).closest('li');
            taskListItem.remove();
        } else {
            console.error('Error al eliminar la tarea:', response.statusText);
        }
    })
    .catch(error => console.error('Error al eliminar la tarea:', error));
}


function updateUser(userId) {
    
}

function deleteUser(userId) {
    
}

// Función para manejar el envío de formularios de usuario y tarea
function handleFormSubmission(form, url, successCallback) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const newData = await response.json();
            successCallback(newData);
            form.reset();
            // Actualizar la lista de usuarios o tareas después de agregar uno nuevo
            if (form === formElements.userForm) {
                loadListUsers();
            } else if (form === formElements.taskForm) {
                loadTaskList();
            }
        } catch (error) {
            console.error(`Error al crear ${form.id === 'formElements.userForm' ? 'el usuario' : 'la tarea'}:`, error);
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    // // Cargar la lista de usuarios y tareas al cargar la página
    loadListUsers();
    loadTaskList();

    // // Manejar envío de formularios
    handleFormSubmission(formElements.userForm, 'http://localhost:3303/users', addUserToList);
    handleFormSubmission(formElements.taskForm, 'http://localhost:3303/tasks', addTaskToList);
});