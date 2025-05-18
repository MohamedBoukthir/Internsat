# Stage 1: Build the app
FROM node:22.14.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.docker .env

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
