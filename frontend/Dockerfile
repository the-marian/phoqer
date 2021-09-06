FROM node:14-alpine
ENV NEXT_PUBLIC_HOST=http://dev.phoqer.com
WORKDIR /home/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build