FROM node:latest as build

WORKDIR /app
COPY . .
RUN npm ci && npm run build
WORKDIR /app/dist
CMD ["node", "main.js"]