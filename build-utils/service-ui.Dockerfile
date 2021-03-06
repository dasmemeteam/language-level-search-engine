# Dockerfile for service-ui

# stage 1: build our react app
FROM node:dubnium-alpine as builder

COPY services/service-ui/package*.json /app/
WORKDIR /app

RUN yarn install

COPY services/service-ui/ /app
RUN yarn build

# copy globals for API key 
COPY bin/globals.json /app/src


# stage 2: build an image with NGINX that we will use in production
FROM nginx:stable-alpine

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html
# include the new nginx default config file 
COPY config/nginx/default.conf /etc/nginx/conf.d/