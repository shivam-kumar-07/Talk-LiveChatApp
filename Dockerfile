FROM node:12.2.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8001
CMD [ "node", "node-server/app.js" ]