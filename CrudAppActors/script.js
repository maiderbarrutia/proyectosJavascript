// Obtener lista de actores al cargar la página
fetch('http://localhost:3302/actors')
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {
        const actorsList = document.getElementById('actors-list');
        data.forEach(actor => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const p = document.createElement('p');
            // li.textContent = `${actor.actor_id} ${actor.first_name} ${actor.last_name}`;
            span.textContent = `${actor.actor_id}`;
            p.textContent = `${actor.first_name} ${actor.last_name}`;

            // Botón para eliminar actor
            const divButtons = document.createElement('div');
            divButtons.className = "allButtons";
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteActor(actor.actor_id));
            
            // Botón para editar actor
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editActor(actor));

            //Pintar los elementos
            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(divButtons);
            divButtons.appendChild(editButton);
            divButtons.appendChild(deleteButton);
            actorsList.appendChild(li);
        });
    })
    .catch(error => console.error('Error al obtener los actores:', error));

// Función para eliminar actor
function deleteActor(id) {
    fetch(`http://localhost:3302/actors/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                // Actualizar la lista de actores
                location.reload();
            } else {
                console.error('Error al eliminar el actor:', response.statusText);
            }
        })
        .catch(error => console.error('Error al eliminar el actor:', error));
}

// Función para editar actor (redirecciona a otra página o muestra un formulario)
function editActor(actor) {
  // Obtener el modal y sus componentes
  const modal = document.getElementById('edit-modal');
  const firstNameInput = document.getElementById('edit-first-name');
  const lastNameInput = document.getElementById('edit-last-name');
  const saveButton = document.getElementById('edit-save-button');

  // Poblar el formulario con los datos del actor
  firstNameInput.value = actor.first_name;
  lastNameInput.value = actor.last_name;

  // Mostrar el modal
  modal.style.display = 'block';
  document.body.style.overflow = "hidden";

  // Escuchar el evento de clic en el botón de guardar
  saveButton.onclick = () => {
    // Obtener los nuevos valores del formulario
    const newFirstName = firstNameInput.value;
    const newLastName = lastNameInput.value;

    // Realizar la solicitud de actualización
    fetch(`http://localhost:3302/actors/${actor.actor_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name: newFirstName, last_name: newLastName })
    })
    .then(response => {
      if (response.ok) {
        // Actualizar la lista de actores y cerrar el modal
        location.reload();
        modal.style.display = 'none';
        document.body.style.overflow = "auto";
        firstNameInput.value = "";
        lastNameInput.value = "";
      } else {
        console.error('Error al actualizar el actor:', response.statusText);
      }
    })
    .catch(error => console.error('Error al actualizar el actor:', error));
  };
  
}


// Función para añadir actor
document.getElementById('add-actor-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newActor = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value
  };

  fetch('http://localhost:3302/actors', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newActor)
  })
      .then(response => {
          if (response.ok) {
              // Actualizar la lista de actores
              location.reload();
          } else {
              console.error('Error al añadir el actor:', response.statusText);
          }
      })
      .catch(error => console.error('Error al añadir el actor:', error));
});

document.getElementById('close').addEventListener('click', (event) => {
  event.preventDefault();
  const modal = document.getElementById('edit-modal');
  modal.style.display = 'none';
});