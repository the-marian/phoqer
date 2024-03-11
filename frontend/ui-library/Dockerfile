# Use official node image
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build-storybook


# Use official nginx image
FROM nginx:stable-alpine
COPY --from=build /app/storybook-static /app
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf