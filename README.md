# FixItHubInnovae
prueba técnica innovae 

# Gestor Web de Incidencias (TALL Stack)

Este proyecto es una aplicación web para gestionar incidencias, con roles de **Administrador** y **Soporte**. Los usuarios pueden gestionar el ciclo de vida de las incidencias que pasan por tres estados: "To Do", "Doing" y "Done". La API es protegida por autenticación, y las incidencias son visibles dependiendo del rol del usuario.

La aplicación está construida usando el **TALL Stack** (TailwindCSS, AlpineJS, Laravel, Livewire), y se ejecuta dentro de contenedores Docker para facilitar la implementación.

## Requisitos

Para ejecutar este proyecto localmente, necesitas tener lo siguiente instalado en tu máquina:

- Docker
- Docker Compose

## Estructura del Proyecto

El proyecto se divide en tres partes principales:

1. **Frontend**: Construido con **Angular** para la interfaz de usuario.
2. **Backend**: Construido con **Laravel** para la gestión de la API y la lógica de negocio.
3. **Base de Datos**: Utiliza **SQL Server** como sistema de gestión de base de datos.
4. **Servidor Web**: Usamos **Nginx** como proxy inverso para servir tanto el frontend como la API.

### Estructura de Directorios

project-root/ ├── backend/ # Directorio del Backend (Laravel) │ ├── app/ # Código fuente de Laravel │ ├── config/ # Configuración de Laravel │ ├── database/ # Migraciones y seeders │ ├── public/ # Archivos públicos, como index.php │ ├── .env # Configuración de entorno (base de datos, etc.) │ └── Dockerfile # Dockerfile para backend │ ├── frontend/ # Directorio del Frontend (Angular) │ ├── src/ # Código fuente de Angular │ ├── angular.json # Configuración del proyecto Angular │ ├── Dockerfile # Dockerfile para frontend │ ├── nginx/ # Configuración de Nginx │ └── default.conf # Archivo de configuración de Nginx │ ├── docker-compose.yml # Definición de todos los contenedores Docker └── README.md # Documentación del proyecto

bash
Copiar código

## Instalación

1. **Clonar el repositorio**

   Primero, clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu_usuario/gestor-incidencias.git
   cd gestor-incidencias
Configurar las Variables de Entorno

Asegúrate de configurar el archivo .env en el backend con las credenciales correctas de la base de datos. Este archivo se encuentra en el directorio backend/.

env
Copiar código
DB_CONNECTION=sqlsrv
DB_HOST=db
DB_PORT=1433
DB_DATABASE=incidencias
DB_USERNAME=sa
DB_PASSWORD=YourStrong(!)Password
Construir y Levantar los Contenedores Docker

Una vez tengas los archivos listos, puedes construir y levantar los contenedores Docker con el siguiente comando:

bash
Copiar código
docker-compose up --build
Este comando hará lo siguiente:

Clonará los repositorios del frontend (Angular) y del backend (Laravel).
Construirá las imágenes Docker para ambos, el frontend y el backend.
Levantará los contenedores de la base de datos SQL Server y el servidor web Nginx.
Conectará todo para que la aplicación funcione correctamente.
Acceder a la Aplicación

Una vez que los contenedores estén en ejecución, puedes acceder a la aplicación de la siguiente manera:

Frontend (Angular): Abre tu navegador y accede a http://localhost.
Backend (Laravel API): La API estará disponible en http://localhost/api.
Cómo Funciona
Roles y Gestión de Incidencias
Administrador:

Puede ver todas las incidencias y asignarlas a Soporte.
Puede cambiar el estado de las incidencias entre "To Do", "Doing" y "Done".
Soporte:

Solo puede ver las incidencias asignadas a él.
Puede cambiar el estado de las incidencias asignadas entre "To Do", "Doing" y "Done".
API
La API está protegida mediante autenticación y permite gestionar incidencias. Puedes hacer peticiones a la API para consultar las incidencias filtradas por su estado.

Autenticación
El sistema de autenticación se maneja con Laravel, y las rutas de la API requieren un token para acceder a ellas.

Pruebas
Para correr las pruebas de la API y el frontend, sigue los siguientes pasos:

Pruebas de Backend (Laravel)

Para ejecutar las pruebas de Laravel, entra en el contenedor del backend y ejecuta el comando:

bash
Copiar código
docker exec -it backend bash
php artisan test
Pruebas de Frontend (Angular)

Para correr las pruebas de Angular, entra en el contenedor del frontend y ejecuta:

bash
Copiar código
docker exec -it frontend bash
npm run test
Docker Compose
El archivo docker-compose.yml está configurado para manejar los siguientes servicios:

nginx: Se utiliza para servir el frontend (Angular) y redirigir las solicitudes a la API (Laravel).
backend: Contenedor que ejecuta Laravel, con la API y la lógica de negocio.
frontend: Contenedor que ejecuta Angular, el cual interactúa con la API.
db: Contenedor con SQL Server que almacena la información de las incidencias.
Problemas Comunes
No se pueden conectar los contenedores: Si experimentas problemas de conexión entre contenedores, verifica la configuración de redes en el archivo docker-compose.yml.
Falta de dependencias: Si alguna dependencia falta en el frontend o backend, puedes asegurarte de que las instalaciones se hayan realizado correctamente revisando los logs de los contenedores.
Contribución
Si deseas contribuir a este proyecto, puedes hacer un fork y enviar un pull request con tus cambios. Asegúrate de que las pruebas estén cubiertas y funcionando antes de enviar los cambios.

¡Gracias por revisar este proyecto! Si tienes alguna pregunta, no dudes en abrir un issue en GitHub o contactarme directamente.

markdown
Copiar código

---

### **Explicación de las Secciones en el README.md**:

- **Requisitos**: Especifica que necesitas tener Docker y Docker Compose instalados para poder ejecutar el proyecto.
- **Estructura del Proyecto**: Muestra cómo está organizado el código, los directorios y los archivos importantes.
- **Instalación**: Explica los pasos para clonar el repositorio y configurar el entorno para que los contenedores Docker funcionen correctamente.
- **Funcionamiento de la Aplicación**: Describe los roles de usuario y cómo funciona la gestión de incidencias.
- **Pruebas**: Instrucciones para ejecutar las pruebas tanto para el frontend como para el backend.
- **Docker Compose**: Breve explicación sobre los servicios que maneja el archivo `docker-compose.yml`.
- **Contribución**: Instrucciones para contribuir al proyecto, en caso de que otros usuarios quieran ayudar.

Este `README.md` proporciona una guía completa para que otros puedan clonar, configurar y ejecutar tu aplicación sin problemas.
