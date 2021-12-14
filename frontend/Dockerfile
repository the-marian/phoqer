FROM node:14-alpine
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST "$NEXT_PUBLIC_HOST"
WORKDIR /home/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build