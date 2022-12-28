const express = require('express');
const app = express();
const mysql = require('mysql');

// Crea una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_cotizacion'
});

// Conecta a la base de datos
connection.connect();

// Establece una ruta para manejar solicitudes de inicio de sesión
app.post('/api/login', (req, res) => {
  // Obtiene los datos del formulario de inicio de sesión
  const username = req.body.username;
  const password = req.body.password;

  // Consulta la base de datos para verificar si el nombre de usuario y la contraseña son válidos
  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      // Si hay un error, envía un mensaje de error al cliente
      res.status(500).send({ error: 'Error al iniciar sesión' });
    } else {
      if (results.length > 0) {
        // Si se encontró un usuario con ese nombre de usuario y contraseña, envía una respuesta de éxito al cliente
        res.send({ success: true });
      } else {
        // Si no se encontró un usuario con ese nombre de usuario y contraseña, envía un mensaje de error al cliente
        res.status(401).send({ error: 'Nombre de usuario o contraseña incorrectos' });
      }
    }
  });
});

app.post('/api/register', (req, res) => {
  // obtener los datos de registro del usuario des
  const { username, email, password } = req.body;

  // validar los datos de registro del usuario
  if (!username || !email || !password) {
    return res.status(400).send({ message: 'Faltan datos de registro' });
  }

  // agregar un nuevo usuario a la base de datos
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  const params = [username, email, password];
  connection.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al crear usuario' });
    }
    res.status(201).send({ message: 'Usuario creado exitosamente' });
  });
});

// Inicia el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});