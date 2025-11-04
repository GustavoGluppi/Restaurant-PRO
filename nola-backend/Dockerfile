FROM node:20-bullseye

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/server.js"]
