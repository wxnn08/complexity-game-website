FROM node:18-alpine AS build
WORKDIR /complexity-game-website/

COPY package.json package-lock.json tsconfig.json tailwind.config.js ./
COPY src ./src
COPY public ./public

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
