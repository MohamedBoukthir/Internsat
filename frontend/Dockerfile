# Stage 1: Build
FROM node:22.14.0-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy the built app to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]