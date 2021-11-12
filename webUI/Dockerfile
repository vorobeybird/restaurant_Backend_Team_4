FROM node:latest
WORKDIR /src
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "start"]
EXPOSE 3000