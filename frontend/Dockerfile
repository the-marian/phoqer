FROM node:14-alpine
WORKDIR /home/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .