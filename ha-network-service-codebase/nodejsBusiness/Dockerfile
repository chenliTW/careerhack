FROM node:latest

WORKDIR /app
EXPOSE 8100
COPY package.json .
RUN npm install
COPY index.js .
RUN apt update && apt install dnsutils -y
COPY check-readiness.sh .
RUN npm install pm2@latest -g
ENTRYPOINT pm2-runtime -i 5 index.js