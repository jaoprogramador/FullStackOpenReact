# Usa una imagen base de Node.js
# FROM node:20

# Configura el directorio de trabajo dentro del contenedor
# WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
# COPY package*.json ./

# Instala las dependencias
# RUN npm install

# Copia el resto de los archivos de la aplicación
# COPY . .

# Expone el puerto que usa la aplicación
# EXPOSE 3000

# Define el comando para ejecutar la aplicación
# CMD ["npm", "start"]

#FROM mongo

#COPY ./mongo/mongo-init.js /docker-entrypoint-initdb.d/
# Etapa 1: Construcción
FROM node:20 AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación (si es necesario)
# RUN npm run build

# Etapa 2: Ejecutar la aplicación en producción
FROM node:20-slim

WORKDIR /app

# Copiar el código de la etapa de construcción
COPY --from=build /app /app

# Exponer el puerto que utiliza la aplicación backend (por ejemplo 5000)
EXPOSE 5000

# Comando para arrancar el servidor backend
CMD ["node", "server.js"]
