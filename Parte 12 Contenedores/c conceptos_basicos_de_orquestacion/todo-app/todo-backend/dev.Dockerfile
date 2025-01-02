#FROM node:20

# Establece el directorio de trabajo dentro del contenedor
#WORKDIR /usr/src/app

# Instala dependencias necesarias para desarrollo
#COPY package*.json ./
#RUN npm install --only=development

# Copia el resto de los archivos de la aplicación
#COPY . .

# Instala Nodemon para desarrollo
#RUN npm install -g nodemon

# Exponer el puerto que usa la aplicación
#EXPOSE 3001

# Comando de inicio para desarrollo
#CMD ["nodemon", "index.js"]
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npx", "nodemon", "src/index.js"]

