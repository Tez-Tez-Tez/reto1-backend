# reto1-backend

API REST construida con **Node.js**, **Express** y **MongoDB**. Incluye autenticación JWT y gestión de snippets de código.

## Tecnologías

- Node.js 20 + Express 5
- MongoDB (vía Mongoose)
- JWT (jsonwebtoken) + bcryptjs
- Docker & Docker Compose
- Nodemon (desarrollo)

---

## Levantar el proyecto con Docker

### Prerrequisitos

- [Docker](https://docs.docker.com/get-docker/) instalado y corriendo
- [Docker Compose](https://docs.docker.com/compose/install/) (incluido en Docker Desktop)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Tez-Tez-Tez/reto1-backend.git
cd reto1-backend
```

### 2. Crear el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
JWT_SECRET=clavedeejemplo
MONGO_URI=mongodb://localhost:27017/reto1
```

> La variable `MONGO_URI` es sobreescrita automáticamente por Docker Compose con `mongodb://mongo:27017/reto1` para comunicarse entre contenedores. El valor del `.env` solo aplica para ejecución local sin Docker.

### 3. Construir y levantar los contenedores

```bash
docker compose up --build
```

Esto levantará dos servicios:

| Servicio | Contenedor        | Puerto expuesto         |
|----------|-------------------|-------------------------|
| API      | `practice-1`      | `http://localhost:5000` |
| MongoDB  | `mongo-practice`  | `27017`                 |

### 4. Verificar que está corriendo

```bash
docker compose ps
```

La API estará disponible en: **`http://localhost:5000`**

---

## Comandos útiles

| Comando                        | Descripción                                     |
|--------------------------------|-------------------------------------------------|
| `docker compose up --build`    | Construir imágenes y levantar contenedores      |
| `docker compose up -d`         | Levantar en segundo plano (detached)            |
| `docker compose down`          | Detener y eliminar los contenedores             |
| `docker compose logs -f web`   | Ver logs en tiempo real de la API               |
| `docker compose logs -f mongo` | Ver logs de MongoDB |

---

## Estructura del proyecto

```
reto1-backend/
├── src/
│   ├── app.js              # Punto de entrada
│   ├── config/             # Configuración de base de datos
│   ├── controllers/        # Lógica de negocio
│   ├── middlewares/        # Autenticación y validaciones
│   ├── models/             # Modelos Mongoose
│   └── routes/             # Definición de rutas
├── Dockerfile
├── docker-compose.yml
├── .env
└── package.json
```

---

## Ejecución local (sin Docker)

Si preferís correr el proyecto sin Docker, necesitás tener MongoDB instalado localmente.

```bash
npm install
npm run dev
```

La API correrá en `http://localhost:8080`.
