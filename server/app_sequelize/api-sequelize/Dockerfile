FROM node:16.3.0

WORKDIR /api-sequelize
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]