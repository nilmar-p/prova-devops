FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3005

CMD [ "npm", "run", "start:prod" ]
