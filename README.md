# Challenge Todo List

Este proyecto es una aplicación de lista de tareas (Todo List) que permite a los usuarios crear, editar, eliminar, marcar como completadas y buscar tareas. La aplicación está dividida en dos partes: un frontend desarrollado con **React** y **TailwindCSS**, y un backend desarrollado con **Express** y **TypeScript**, utilizando **SQLite3** como base de datos para la persistencia.

## Características

- **Frontend**:

  - Desarrollado con **React**.
  - Estilizado con **TailwindCSS**.
  - Validación de formularios en el cliente.
  - Filtros para mostrar tareas completadas o pendientes.
  - Funcionalidad de búsqueda de tareas.
  - Visualización del detalle de cada tarea.

- **Backend**:
  - Desarrollado con **Express** y **TypeScript**.
  - Persistencia de datos con **SQLite3**.
  - Validación de datos en el servidor utilizando `zod`.
  - Manejo de errores centralizado.
  - API RESTful para gestionar tareas.

---

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (versión 16 o superior)
- **npm**
- **SQLite3** (opcional, ya que se incluye una base de datos SQLite en el proyecto)

---

## Instrucciones para ejecutar la aplicación localmente

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/mauro-l/ChallengeForIT25
cd challenge-todo-list
```

### 2. Configuración del backend

1. Ve a la carpeta del servidor:

   ```bash
   cd server
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta server y configura las variables de entorno necesarias. Por ejemplo:

   ```
   PORT=8080
   ```

4. Inicia el servidor:

   ```bash
   npm run dev
   ```

   El servidor estará disponible en [http://localhost:8080](http://localhost:8080).

---

### 3. Configuración del frontend

1. Ve a la carpeta del cliente:

   ```bash
   cd ../client
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación de React:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

## Funcionalidades principales

- **Crear tareas:** Permite agregar nuevas tareas con un título y una descripción.
- **Modificar tareas:** Edita el título y la descripción de una tarea existente.
- **Marcar como completada:** Cambia el estado de una tarea a "completada".
- **Visualizar detalles:** Muestra información detallada de una tarea, incluyendo la fecha de creación.

---

## Estructura del proyecto

```
challenge-todo-list/
├── client/         # Código del frontend
├── server/         # Código del backend
├── README.md       # Documentación del proyecto
└── .gitignore      # Archivos ignorados por Git
```

---

## Endpoints del backend

El backend expone los siguientes endpoints:

- **GET /api/tasks**: Obtiene todas las tareas.
- **GET /api/tasks/:id**: Obtiene una tarea por su ID.
- **POST /api/tasks**: Crea una nueva tarea.
- **PATCH /api/tasks/:id**: Actualiza una tarea existente.
- **DELETE /api/tasks/:id**: Elimina una tarea.

---

## Scripts disponibles

### Backend (en la carpeta server)

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Compila el proyecto TypeScript a JavaScript.
- `npm start`: Inicia el servidor en producción.

### Frontend (en la carpeta client)

- `npm run dev`: Inicia la aplicación en modo desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la aplicación compilada.

---

## Características opcionales implementadas

- **Validación de formularios**: Validación tanto en el cliente como en el servidor.
- **Persistencia con SQLite3**: Los datos se almacenan en una base de datos SQLite.
- **Uso de TypeScript**: El backend está completamente desarrollado en TypeScript.
- **Estilos con TailwindCSS**: El frontend utiliza TailwindCSS para los estilos.
- **Filtros y búsqueda**: Funcionalidad para filtrar tareas completadas/pendientes y buscar tareas por título o descripción.

---

## Tecnologías utilizadas

- **Frontend**:

  - React
  - TailwindCSS
  - Vite

- **Backend**:
  - Express
  - TypeScript
  - SQLite3
  - Zod (para validación)

---

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

---

## Licencia

Este proyecto está bajo la licencia MIT.

---
