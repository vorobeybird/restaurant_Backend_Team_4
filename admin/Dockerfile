FROM node:latest
WORKDIR /build
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 3000