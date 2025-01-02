# El primer FROM ahora es una etapa llamada build-stage
FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

#RUN npm install -g serve

#CMD ["serve", "dist"]
# Esta es una nueva etapa, todo lo anterior a esta linea ha desaparecido, excepto por los archivos que queremos COPIAR
FROM nginx:1.25-alpine

# COPIA el directorio dist de build-stage a /usr/share/nginx/html
# El destino fue encontrado en la pagina de Docker hub
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html