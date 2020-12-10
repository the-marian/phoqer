# pull official base image
FROM node:alpine

# set work directory
WORKDIR /home/share/frontend

# copy source files
COPY . /home/share/frontend

# install dependencies
RUN yarn install

RUN yarn build

CMD yarn start