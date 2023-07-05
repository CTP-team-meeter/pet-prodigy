# Base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies for the entire application
RUN npm ci --only=production

# Copy the client directory
COPY client /app/client

# Install client dependencies and build the client
WORKDIR /app/client
RUN npm install
RUN npm run build

# Copy the server directory
WORKDIR /app
COPY server /app/server

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Expose the necessary ports
EXPOSE 3000 8080

# Set the command to start both the client and server
CMD npm run start:dev
