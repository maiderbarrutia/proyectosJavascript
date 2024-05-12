document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const taskForm = document.getElementById('taskForm');
    const userList = document.getElementById('userList');
    const taskList = document.getElementById('taskList');
    const assignedToSelect = document.getElementById('assignedTo');
  
    // Función para cargar la lista de usuarios
    function cargarListaUsuarios() {
        // Limpiar lista de usuarios y select de asignación
        userList.innerHTML = '';
        assignedToSelect.innerHTML = '<option value="">No asignado</option>';
        
        // Cargar lista de usuarios al cargar la página
        fetch('http://localhost:3303/users')
          .then(response => response.json())
          .then(users => {
            users.forEach(user => {
                console.log(user)
                //Mostrar la lista de usuarios en el HTML
                const listItem = document.createElement('li');
                listItem.textContent = `${user.name} ${user.surname} (${user.email})`;
                userList.appendChild(listItem);

                //Agregar los usuarios al select de las tareas a añadir
                const option = document.createElement('option');
                option.value = user._id; // Puedes utilizar el _id del usuario como el valor de la opción
                option.textContent = `${user.name} ${user.surname} (${user.email})`;
                assignedToSelect.appendChild(option);
            });
          })
          .catch(error => console.error('Error al obtener la lista de usuarios:', error));
    }

    // Función para cargar la lista de tareas
    function cargarListaTareas() {
        // Limpiar lista de tareas
        taskList.innerHTML = '';
        
        // Cargar lista de tareas al cargar la página
        fetch('http://localhost:3303/tasks')
          .then(response => response.json())
          .then(tasks => {
            tasks.forEach(task => {
                console.log(task)
                const assignedTo = task.assignedTo ? `${task.assignedTo.name} ${task.assignedTo.surname} (${task.assignedTo.email})` : 'No asignado';
                const listItem = document.createElement('li');
                listItem.textContent = `${task.title} - ${task.description} (Asignado a: ${assignedTo})`;
                taskList.appendChild(listItem);
            });
          })
          .catch(error => console.error('Error al obtener la lista de tareas:', error));
    }

    // Llamar a la función para cargar la lista de usuarios y tareas al cargar la página
    cargarListaUsuarios();
    cargarListaTareas();
  
    // Manejar envío del formulario de usuario
    userForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(userForm);
      const userData = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
      };
  
      fetch('http://localhost:3303/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(newUser => {
          const listItem = document.createElement('li');
          listItem.textContent = `${newUser.name} ${newUser.surname} (${newUser.email})`;
          userList.appendChild(listItem);
          userForm.reset();
          
          // Después de agregar un usuario, cargar nuevamente la lista de usuarios y actualizar el select de asignación
          cargarListaUsuarios();
        })
        .catch(error => console.error('Error al crear el usuario:', error));
    });
  
    // Manejar envío del formulario de tarea
    taskForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(taskForm);
      const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        deadline: formData.get('deadline'),
        assignedTo: formData.get('assignedTo'),
      };
  
      fetch('http://localhost:3303/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
        .then(response => response.json())
        .then(newTask => {
            console.log(newTask)
          const assignedTo = newTask.assignedTo ? `${newTask.assignedTo.name} ${newTask.assignedTo.surname} (${newTask.assignedTo.email})` : 'No asignado';
          const listItem = document.createElement('li');
          listItem.textContent = `${newTask.title} - ${newTask.description} (Asignado a: ${assignedTo})`;
          taskList.appendChild(listItem);
          taskForm.reset();
          
          // Después de agregar una tarea, cargar nuevamente la lista de tareas
          cargarListaTareas();
        })
        .catch(error => console.error('Error al crear la tarea:', error));
    });
});