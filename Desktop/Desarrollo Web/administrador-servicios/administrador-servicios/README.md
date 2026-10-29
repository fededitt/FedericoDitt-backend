
# Administrador de Servicios

Administrador de servicios para un sistema de turnos y reservas,
desarrollado con Node.js y módulos ECMAScript (ESM).

## Características

- Consulta de todos los servicios.
- Búsqueda de servicios por ID.
- Alta de servicios con generación automática de ID.
- Actualización de servicios existentes.
- Eliminación de servicios.
- Validación de datos obligatorios.
- Configuración mediante variables de entorno.

## Tecnologías

- Node.js
- JavaScript (ESM)
- dotenv
- JSON

## Requisitos

- Node.js en una versión compatible con `node --watch`.
- npm.

## Instalación

Clonar el repositorio:

    git clone URL_DEL_REPOSITORIO

Entrar en la carpeta:

    cd administrador-servicios

Instalar las dependencias:

    npm install

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

    PORT=8080
    NODE_ENV=development

## Ejecución

Iniciar el proyecto:

    npm start

Ejecutar en modo desarrollo:

    npm run dev

## Variables de entorno

| Variable | Descripción | Ejemplo local |
|---|---|---|
| PORT | Puerto configurado para la aplicación | 8080 |
| NODE_ENV | Entorno de ejecución | development |

La aplicación valida que ambas variables estén configuradas al iniciar.

## Recurso: services

Cada servicio contiene los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| id | number | Identificador único del servicio |
| name | string | Nombre del servicio |
| description | string | Descripción del servicio |
| duration | number | Duración en minutos |
| price | number | Precio del servicio |
| category | string | Categoría del servicio |
| available | boolean | Indica si está disponible |

Los datos iniciales se encuentran en `src/data/services.json`.

## Métodos de ServiceManager

### getServices()

Devuelve todos los servicios.

    manager.getServices();

### getServiceById(id)

Devuelve el servicio correspondiente al ID o `null` si no existe.

    manager.getServiceById(2);

### addService(serviceData)

Agrega un servicio y genera su ID automáticamente.
No se debe enviar el ID en los datos.

    manager.addService({
      name: 'Lavado de cabello',
      description: 'Lavado y acondicionamiento.',
      duration: 15,
      price: 4000,
      category: 'Cuidado capilar',
      available: true
    });

Los campos obligatorios son name, description, duration,
price, category y available.

### updateService(id, updatedData)

Actualiza los campos indicados sin modificar el ID.

    manager.updateService(2, {
      price: 11000
    });

Devuelve el servicio actualizado o `null` si no existe.

### deleteService(id)

Elimina un servicio existente.

    manager.deleteService(2);

Devuelve el servicio eliminado o `null` si no existe.

## Persistencia

En esta versión, las operaciones modifican los datos en memoria.
Los cambios no se guardan en el archivo JSON y se pierden al reiniciar
la aplicación.

## Licencia

Proyecto educativo.
