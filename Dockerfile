FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY ./package.json .

RUN pnpm i

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]