FROM node:16.13.2-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

# Set up scripts
RUN chmod 755 /app/scripts/node-dev.sh
RUN chmod 775 /app/scripts/wait-for-it.sh

EXPOSE 3000