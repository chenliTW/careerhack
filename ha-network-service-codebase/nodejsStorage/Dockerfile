FROM node:latest

WORKDIR /app
EXPOSE 8300
COPY package.json .
RUN npm install
COPY index.js .
COPY check-readiness.sh .
RUN npm install pm2@latest -g
ENTRYPOINT pm2-runtime -i 5 index.js