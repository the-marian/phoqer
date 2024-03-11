# Use official node image
FROM node:18-alpine AS build

ENV PORT={{phoqer.port}}
ENV PHOQER_APP_HOST=http://{{phoqer.app_name}}.phoqer.com

ENV PHOQER_BE_HOST=http://api.phoqer.com

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Use official nginx image
FROM nginx:1.21.1

COPY --from=build /app/build /app
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
