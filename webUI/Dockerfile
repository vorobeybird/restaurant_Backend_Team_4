FROM node:latest
WORKDIR /build
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["node", "server.js"]
EXPOSE 3000