import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  // Establece un estado para almacenar el nombre de usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Maneja el envío del formulario de inicio de sesión
  const handleSubmit = (event) => {
    event.preventDefault();

    // Envía una solicitud POST al servidor con los datos del formulario
    axios.post('/login', {
      username,
      password
    }).then((response) => {
      // Si la iniciación de sesión es exitosa, redirige al usuario a otra página
      window.location = '/home';
    }).catch((error) => {
      // Si hay un error, muestra un mensaje de error al usuario
      setError(error.response.data.error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de usuario:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Iniciar sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;