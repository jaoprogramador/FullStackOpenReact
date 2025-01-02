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

FROM mongo

COPY ./mongo/mongo-init.js /docker-entrypoint-initdb.d/