FROM node:20-slim

RUN npm i -g pnpm

WORKDIR /usr/src/app
RUN apt-get update -y && apt-get install -y openssl

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/ 
RUN pnpm install --frozen-lockfile
# COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN pnpm build

EXPOSE 4000 
CMD [ "pnpm", "start" ]
