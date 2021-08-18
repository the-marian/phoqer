FROM node:alpine
WORKDIR /home/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
