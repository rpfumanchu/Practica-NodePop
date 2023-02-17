# NodePop

Instala las dependencias con

```sh
npm install
```

Inicializa la base de datos con:

```sh
npm run initDB
```

Comience en modo de desarrollo:

```sh
npm run dev
```

## Información general

Aplicación creada con:

```sh
npx express-generator nodeapp --ejs
```

## Inicie un servidor MongoDB en Macos o Linux

En la consola, vaya a la carpeta MongoDB y:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

### GET /api/agentes
{
    "results": [
        {
            "_id": "63eaac1bd919d8e221525522",
            "name": "Smith",
            "age": 39
        },
        ...
    ]
}