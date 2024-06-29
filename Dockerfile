FROM node:18-alpine3.15

# Set working directory
RUN mkdir -p /var/www/product
WORKDIR /var/www/product

RUN npm install -g @nestjs/cli


# Copiar el directorio y su contenido
COPY . /var/www/product
COPY package.json tsconfig.json tsconfig.build.json /var/www/product/
RUN npm install --prod
RUN npm run build

# Dar permiso para ejecutar la aplicación
RUN adduser --disabled-password pokeuser
RUN chown -R pokeuser:pokeuser /var/www/product
USER pokeuser

# Limpiar el caché
RUN npm cache clean --force

EXPOSE 3000
