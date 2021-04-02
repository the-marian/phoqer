FROM node:alpine
WORKDIR /home/frontend
COPY package.json ./
RUN yarn install
COPY . /home/frontend
RUN yarn build
CMD yarn start
