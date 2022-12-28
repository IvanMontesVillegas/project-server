import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  // Establece un estado para almacenar los datos del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Maneja el envío del formulario de registro
  const handleSubmit = (event) => {
    event.preventDefault();

    // Envía una solicitud POST al servidor con los datos del formulario
    axios.post('/register', {
      username,
      email,
      password
    }).then((response) => {
      // Si el registro es exitoso, muestra un mensaje de éxito al usuario
      setError('Registro exitoso');
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
        Correo electrónico:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegisterForm;