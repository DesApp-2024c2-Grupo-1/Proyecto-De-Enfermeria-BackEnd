FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm audit fix
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
