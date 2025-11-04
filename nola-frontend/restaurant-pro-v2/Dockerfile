FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
