# Etapa 1: Test
# FROM node:20 as test
# WORKDIR /usr/src/app

# Copiar archivos necesarios
# COPY package*.json ./
# COPY . .

# Instalar dependencias y ejecutar pruebas
# RUN npm install
# RUN npm test -- --watch=false

# Etapa 2: Build (igual que antes)
# FROM node:20 as build
# WORKDIR /usr/src/app
# COPY package*.json ./
# COPY . .
# ARG VITE_BACKEND_URL
# ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# RUN npm install
# RUN npm run build

# Etapa 3: Servidor estático (igual que antes)
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# COPY --from=build /usr/src/app/dist .
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Etapa 1: Construcción
FROM node:20 AS build

WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa de producción (servir la app con Nginx)
FROM nginx:alpine

# Copiar la app construida desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# No es necesario copiar nginx.conf aquí, ya que lo montamos desde el volumen de docker-compose.yml

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

