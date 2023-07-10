FROM node:18


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3016 3017

CMD ["node", "server.js"]
