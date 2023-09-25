FROM node:12.2.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 80
CMD [ "node", "app.js" ]