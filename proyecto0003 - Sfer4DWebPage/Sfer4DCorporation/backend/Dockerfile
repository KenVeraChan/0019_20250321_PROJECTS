# Imagen base de Node
FROM node:20-alpine

# Crear carpeta de la app dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del backend
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "server.js"]
