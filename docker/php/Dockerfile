FROM php:8.3-fpm-alpine

# Set Working Directory
WORKDIR /var/www/html

# Install System Dependencies & Build Tools for PHP Extensions
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libzip-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    postgresql-dev \
    shadow

# Install PHP Core Extensions
RUN docker-php-ext-install pdo pdo_pgsql bcmath xml zip pcntl opcache gd

# Compiled Redis extension directly from source (Fix path to /usr/src/php/ext/redis)
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && git clone https://github.com/phpredis/phpredis.git /usr/src/php/ext/redis \
    && docker-php-ext-install redis \
    && apk del .build-deps

# Install Composer Globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure PHP Runtime Environment (Development Specifics)
COPY docker/php/local.ini /usr/local/etc/php/conf.d/local.ini

# Accept Host UID and GID to synchronize file ownerships
ARG HOST_UID=1000
ARG HOST_GID=1000

# Dynamically change www-data UID and GID to match the Arch Linux Host User
RUN groupmod -g ${HOST_GID} www-data && \
    usermod -u ${HOST_UID} -g www-data www-data

# Adjust global folder ownerships for Laravel storage structures
RUN chown -R www-data:www-data /var/www

# Switch context to the synchronized developer user
USER www-data

# Expose PHP-FPM Port
EXPOSE 9000

CMD ["php-fpm"]
