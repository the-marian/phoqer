FROM node:14-alpine
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_WS
ENV NEXT_PUBLIC_URL "$NEXT_PUBLIC_URL"
ENV NEXT_PUBLIC_WS "$NEXT_PUBLIC_WS"
WORKDIR /home/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build