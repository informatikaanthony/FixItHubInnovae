# Usamos la imagen oficial de PHP 8.3 (CLI)
FROM php:8.3-cli

# Instalamos las dependencias necesarias para Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip \
    libxml2-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql xml && \
    apt-get clean

# Instalamos Composer (gestor de dependencias de PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /backend-app

# Exponemos el puerto 8000 para el servidor de desarrollo de Laravel
EXPOSE 8000

# Comando por defecto para iniciar el servidor de desarrollo de Laravel
CMD ["bash"]
