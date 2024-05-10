// Hacer una solicitud al servidor para obtener los usuarios
fetch('http://localhost:3302/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {
        const listaUsuarios = document.getElementById('lista-usuarios');
        data.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Nombre:</strong> ${usuario.nombre} - <strong>Email:</strong> ${usuario.email}`;
            listaUsuarios.appendChild(li);
        });
    })
    .catch(error => console.error('Error al obtener usuarios:', error));
