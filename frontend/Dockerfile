FROM node:alpine
WORKDIR /home/frontend
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn run build", "yarn run start"]
