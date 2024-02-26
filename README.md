# code-chronicles
Blog example
## RUN APP GUIDE
## API Routes
### Auth routes:
- /api/auth/register: `POST` para registrar un nuevo usuario.
- /api/auth/login: `POST` para iniciar sesión.
- /api/auth/logout: `GET` para cerrar la sesión.
### Rutas de Publicaciones:
- /api/posts: `GET` para obtener todas las publicaciones.
- /api/posts/:id: `GET` para obtener una publicación específica.
- /api/posts: `POST` para crear una nueva publicación.
- /api/posts/:id: `PUT` para editar una publicación existente.
- /api/posts/:id: `DELETE` para eliminar una publicación existente.
### Rutas de Comentarios:
- /api/posts/:id/comments: `GET` para obtener todos los comentarios de una publicación.
- /api/posts/:id/comments: `POST` para agregar un nuevo comentario a una publicación.
- /api/posts/:id/comments/:commentId: `DELETE` para eliminar un comentario de una publicación.

## Client Routes:
- Ruta de inicio: "/" - Muestra la lista de publicaciones más recientes o la página de inicio del blog.
- Ruta de publicación individual: "/post/:id" - Muestra una publicación individual con el ID específico.
- Ruta de registro: "/register" - Permite a los usuarios crear una nueva cuenta.
- Ruta de inicio de sesión: "/login" - Permite a los usuarios iniciar sesión en sus cuentas existentes.
- Ruta de creación de publicación: "/create" - Permite a los usuarios crear una nueva publicación.
- Ruta de perfil de usuario: "/profile" - Muestra la información y las publicaciones del usuario actual.
- Ruta de edición de publicación: "/edit/:id" - Permite a los usuarios editar una publicación existente.

## Technologies:
  - **MongoDB**
  - **Node.js**
  - **Express.js**
  - **EJS**
  - **Bootstrap**
  - **Font-awesome**
