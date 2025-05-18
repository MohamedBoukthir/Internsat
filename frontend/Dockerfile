# Base image for Node
FROM node:22.14.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Use production env variables
COPY .env.docker .env.local

# Build the frontend
RUN npm run build

# Serve with preview server
EXPOSE 3000
CMD ["npm", "run", "preview"]
