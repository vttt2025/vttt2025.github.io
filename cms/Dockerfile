FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
