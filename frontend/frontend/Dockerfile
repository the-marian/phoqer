FROM node:21-alpine AS base

ARG NEXT_PUBLIC_BACK_URL

ENV NEXT_PUBLIC_BACK_URL https://api.phoqer.com

# Set the working directory inside the container
WORKDIR ./phoqer

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm ci

# Build the Next.js application for production
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
