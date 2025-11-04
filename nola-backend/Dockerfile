FROM node:20-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npx", "tsx", "server.ts"]
