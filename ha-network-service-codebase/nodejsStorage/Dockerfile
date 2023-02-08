FROM node:latest

WORKDIR /app
EXPOSE 8300
COPY package.json .
RUN npm install
COPY index.js .
COPY check-readiness.sh .
ENTRYPOINT node index.js