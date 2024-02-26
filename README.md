# code-chronicles

Blog example

## RUN APP GUIDE

## API Routes

### Auth routes:

- _/api/auth/register_: `POST` para registrar un nuevo usuario.
- _/api/auth/login_: `POST` para iniciar sesión.
- _/api/auth/logout_: `GET` para cerrar la sesión.

### Rutas de Publicaciones:

- _/api/posts_: `GET` para obtener todas las publicaciones.
- _/api/posts/:id_: `GET` para obtener una publicación específica.
- _/api/posts_: `POST` para crear una nueva publicación.
- _/api/posts/:id_: `PUT` para editar una publicación existente.
- _/api/posts/:id_: `DELETE` para eliminar una publicación existente.

### Rutas de Comentarios:

- _/api/posts/:id/comments_: `GET` para obtener todos los comentarios de una publicación.
- _/api/posts/:id/comments_: `POST` para agregar un nuevo comentario a una publicación.
- _/api/posts/:id/comments/:commentId_: `DELETE` para eliminar un comentario de una publicación.

## Client Routes:

- _/_: **Inicio** - Muestra la lista de publicaciones más recientes o la página de inicio del blog.
- _/post/:id_: **Publicación individual** - Muestra una publicación individual con el ID específico.
- _/register_: **Registro** - Permite a los usuarios crear una nueva cuenta.
- _/login_: **Inicio de sesión** - Permite a los usuarios iniciar sesión en sus cuentas existentes.
- _/create_: **Creación de publicación** - Permite a los usuarios crear una nueva publicación.
- _/profile/:username_: **Perfil de usuario** - Muestra la información y las publicaciones de un usuario.
- _/edit/:id_: **Edición de publicación** - Permite a los usuarios editar una publicación existente.

## Technologies:

- **MongoDB**
- **Node.js**
- **Express.js**
- **EJS**
- **Bootstrap**
- **Font-awesome**
