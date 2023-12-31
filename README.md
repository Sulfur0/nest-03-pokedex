<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el proyecto
2. Ejecutar

```
yarn install
```

o

```
npm install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Clonar el archivo '**.env.example**' al archivo '**.env**' y hacer los cambios necesarios a las variables de entorno

5. Levantar la base de datos de manera detached

```
docker-compose up -d
```

6. Levantar el proyecto en entorno de desarrollo

```
npm run start:dev
```

6. Recargar o reconstruir la base de datos
   http://localhost:3000/api/seed

7. limpiar la base de datos
   http://localhost:3000/api/seed/clear

## Stack usado

- MongoDB
- Nest

## URL del deployment en Railway

- https://railway.app/project/8c7c81f9-81b6-4502-a58b-073703876937
