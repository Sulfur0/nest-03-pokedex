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

4. Levantar la base de datos de manera detached

```
docker-compose up -d
```

5. Recargar o reconstruir la base de datos
   http://localhost:3000/api/seed

6. limpiar la base de datos
   http://localhost:3000/api/seed/clear

## Stack usado

- MongoDB
- Nest
