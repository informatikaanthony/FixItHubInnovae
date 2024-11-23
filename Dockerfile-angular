# Usamos la imagen base de Node.js 22.11.0
FROM node:22.11.0

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Actualizamos el sistema y luego instalamos dependencias necesarias
RUN apt-get update && apt-get install -y

# Configurar Git con usuario y correo
RUN git config --global user.email "informatikaanthony@gmail.com" && \
    git config --global user.name "Anthony Velez"
    # Configuramos Git para que use 'main' como la rama predeterminada en lugar de 'master'
RUN git config --global init.defaultBranch main && \
echo "Git configurado para usar 'main' como rama predeterminada."

# actualizar el nmp a la ultima versión
RUN npm install -g npm@latest

# Instalamos Angular CLI globalmente
RUN npm install -g @angular/cli@19.0.1 --verbose

# Exponemos el puerto en el que se ejecutará Angular (por defecto es el 4200)
EXPOSE 4200

# Añadimos la ruta global de los binarios de npm
ENV PATH=/app/node_modules/.bin:$PATH

# Comando para iniciar el servidor de desarrollo Angular
CMD ["tail", "-f", "/dev/null"]

