FROM node:alpine
WORKDIR /home/frontend
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build
