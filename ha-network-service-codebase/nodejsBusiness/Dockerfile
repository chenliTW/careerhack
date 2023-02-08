FROM node:latest

WORKDIR /app
EXPOSE 8100
COPY package.json .
RUN npm install
COPY index.js .
ENTRYPOINT node index.js