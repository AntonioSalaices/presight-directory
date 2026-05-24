FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY client/package.json ./client/
RUN yarn install --frozen-lockfile

COPY client/ ./client/

WORKDIR /app/client
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]