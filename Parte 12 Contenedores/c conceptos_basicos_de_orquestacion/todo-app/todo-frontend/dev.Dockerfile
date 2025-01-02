#FROM node:20

#WORKDIR /usr/src/app

#COPY . .

# Cambia npm ci a npm install ya que vamos a estar en modo de desarrollo
#RUN npm install

# Instala bash
#RUN apk add --no-cache bash

# npm run dev es el comando para iniciar la aplicación en modo de desarrollo
#CMD ["bash", "npm", "run", "dev", "--", "--host"]
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

