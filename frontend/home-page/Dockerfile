# 1. Install dependencies only when needed
FROM node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

ENV PHOQER_HOST https://phoqer.com
ENV PHOQER_BE_HOST https://api.phoqer.com

ENV PHOQER_AUTHOR_DASHBOARD https://author-dashboard.phoqer.com
ENV PHOQER_CLIENT_DASHBOARD https://client-dashboard.phoqer.com
ENV PHOQER_AUTH_MODULE https://auth-app.phoqer.com
ENV PHOQER_CHATS_MODULE https://chats-app.phoqer.com

ENV NODE_ENV production

RUN npm run build

CMD ["npm", "start"]
