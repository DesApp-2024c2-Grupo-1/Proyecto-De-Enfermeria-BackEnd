<h1>Proyecto Registro de evaluaciones de Enfermeria</h1>

<h3><ins>Proceso para instalar y levantar la app</ins></h3>

Primero cree un directorio donde va alojar este repositorio y el repositorio "Proyecto-De-Enfermeria-FrontEnd".
Además de tener ambos repositorios debe crear un archivo ```docker-compose.yml``` el cual debe copiar y pegar lo siguiente:
```
services:
  db:
    image: postgres:12.5
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin1234
      POSTGRES_DB: enfermeria
    ports:
      - "5432:5434"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: 
      context: ./Proyecto-De-Enfermeria-BackEnd
      dockerfile: Dockerfile
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:admin1234@db:5434/enfermeria
    ports:
      - "3000:3000"
    working_dir: /app
    volumes:
      - ./Proyecto-De-Enfermeria-BackEnd:/app:cached
      - /app/node_modules
    command: npm run start:dev

  frontend:
    build:
      context: ./Proyecto-De-Enfermeria-FrontEnd
      dockerfile: Dockerfile
    depends_on:
      - backend
    ports:
      - "3001:5173"
    working_dir: /app
    volumes:
      - ./Proyecto-De-Enfermeria-FrontEnd:/app:cached
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=1
    command: npm run dev

volumes:
  pgdata:
```
Luego dentro del repositorio "Proyecto-De-Enfermeria-BackEnd" debe crear un archivo ```.env``` el cual debe copiar y pegar lo siguiente:
```
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=admin1234
DATABASE_NAME=enfermeria
```

Luego utilice en el directorio raiz el comando ```docker-compose up --build``` para instalar todas las dependencias y levantar tanto el back, el front y la bd del proyecto.

<h4><ins>Notas adicionales:</ins></h4>
El front se aloja en localhost:3001 y el back en localhost:3000

