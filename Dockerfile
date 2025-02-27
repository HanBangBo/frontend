# Stage 1: Build the React app
FROM node:22.14.0 as build

WORKDIR /app

COPY hanbangbo/package.json ./
COPY hanbangbo/yarn.lock ./

RUN yarn install

COPY hanbangbo ./

RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

COPY hanbangbo/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
