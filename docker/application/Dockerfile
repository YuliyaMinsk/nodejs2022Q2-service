# Base image
FROM node:lts-alpine

# Create app directories
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prod" ]
