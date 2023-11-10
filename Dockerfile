FROM node:18
WORKDIR /usr/src/zsa-chat-service
ENV NODE_ENV=dev
COPY package*.json ./
COPY .env.dev ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "node", "./src/server.ts" ]
