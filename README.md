# 🍄 Videojuegos Mario Bros

Aplicación web desarrollada para la asignatura **Entornos de Desarrollo**.

El proyecto consiste en una aplicación **backend + frontend** que permite gestionar información del universo Mario Bros mediante operaciones CRUD completas.

---

## 📌 Descripción

La aplicación permite administrar tres entidades principales:

- 🎮 **Videojuegos**
- 🕹️ **Consolas**
- 🏰 **Personajes**

El usuario puede:

- visualizar datos
- crear nuevos registros
- editar registros existentes
- eliminar registros

Además, los **videojuegos están relacionados con consolas y personajes**, mostrando información enriquecida en el frontend.

---

## 🧱 Tecnologías utilizadas

### Backend
- Node.js
- Express
- SQLite
- Knex
- CORS

### Frontend
- HTML
- JavaScript
- Bootstrap
- Axios

---

## 📁 Estructura del proyecto

```text
mario-videogames/
├── backend/
│   ├── src/
│   │   └── app.js
│   ├── package.json
│   └── mario.db
├── frontend/
│   ├── src/
│   │   ├── index.html
│   │   ├── videojuegos.html
│   │   ├── videojuegos.js
│   │   ├── consolas.html
│   │   ├── consolas.js
│   │   ├── personajes.html
│   │   └── personajes.js
│   └── package.json
```

# ⚙️ Puesta en marcha del proyecto


### 📥 1. Clonar el repositorio
```
git clone <URL_DEL_REPOSITORIO>
cd mario-videogames
```

### 🔧 2.Ejecutar el backend 
```
cd backend
npm install
npm run dev
```
El backend se ejecuta en: http://localhost:8080

### 🌐 3.Ejecutar el frontend
```
cd frontend
npm install
npm start
```
El frontend se ejecuta normalmente: http://localhost:1234


# 🔗 API Rest

### 🎮 Videojuegos
* GET	/videojuegos
* GET	/videojuegos/:id_videojuego
* POST	/videojuegos
* PUT	/videojuegos/:id_videojuego
* DELETE	/videojuegos/:id_videojuego

### 🕹️ Consolas
* GET	/consolas
* GET	/consolas/:id_consola
* POST	/consolas
* PUT	/consolas/:id_consola
* DELETE	/consolas/:id_consola

### 🏰 Personajes
* GET	/personajes
* GET	/personajes/:id_personaje
* POST	/personajes
* PUT	/personajes/:id_personaje
* DELETE	/personajes/:id_personaje

# 🖥️Funcionalidades del frontend

* Navegación entre páginas
* Formularios para crear y editar
* Tablas con datos dinámicos
* Edición directa desde la tabla
* Eliminación de registros
* Carga de selects dinámicos (consolas y personajes)
* Interfaz responsive con Bootstrap

# ⭐ Funcionalidades extra implementadas
* Relación entre entidades (videojuegos ↔ consolas ↔ personajes)
* Tercer elemento con CRUD completo (personajes)
* Validación en frontend
* Validación en backend 
* Colección Postman con ejemplos de uso de la API (Adjunto en este repositorio).


# 🗄️ Base de datos
La aplicación utiliza SQLite.

* El archivo mario.db se encuentra en:
```
backend/mario.db
```

# 🧪 Uso de la API
La API puede probarse mediante:
* Navegador (GET)
* Herramientas como - Postman