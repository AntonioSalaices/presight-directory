FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json yarn.lock ./
COPY server/package.json ./server/
RUN yarn install --frozen-lockfile

# rebuild better-sqlite3 para linux
RUN npm rebuild better-sqlite3 --build-from-source

COPY . .

WORKDIR /app/server
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/index.js"]