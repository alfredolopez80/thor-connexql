FROM node:10.20.0 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build


FROM node:10.20.0-alpine

RUN apk --no-cache add \
  git \
  python \
  make \
  gcc \
  g++

WORKDIR /var/app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/dist ./

EXPOSE 8080

CMD ["node", "index.js"]