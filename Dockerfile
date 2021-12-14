#Descarga de la imagen base
FROM node:12.14.1-alpine
#Crear el directorio 
WORKDIR /usr/src/app
#ubicaccion de los archivos
COPY package*.json ./
#instalacion de depencias
RUN npm install
#Copiar los demas archivos de la node app
COPY . .
#el puerto que se va a exponer
EXPOSE 8080
#Run app
CMD ["npm","start"]

