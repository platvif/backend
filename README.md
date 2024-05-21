## Ahora, iniciamos el servidor:

- node server.js

- localhost:3000

Con esto, tu servidor debería estar corriendo y listo para manejar las rutas de registro y login.

# Probar las rutas
Registro de usuario
Para registrar un usuario, puedes hacer una solicitud POST a http://localhost:3000/api/user/register con el siguiente cuerpo (body):

{
    "name": "Marcos",
    "lastname": "Bottino",
    "mail": "mbottino01@gmail.com",
    "pass": "****"
}
# Login de usuario
Para loguear un usuario, puedes hacer una solicitud POST a http://localhost:3000/api/user/login con el siguiente cuerpo (body):

{
    "mail": "mbottino01@gmail.com",
    "pass": "****"
}

Si el login es exitoso, recibirás el objeto completo del usuario, incluyendo los campos vacíos que se pueden llenar más adelante.
