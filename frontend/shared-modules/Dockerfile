
# Use official node image
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:react


# Use official nginx image
FROM nginx:stable-alpine
COPY --from=build /app/build /app
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf