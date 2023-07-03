# Use a Node.js 18 base image
FROM node:18

# Set the working directory
WORKDIR /home/node/app

# Copy the server files
COPY server /home/node/app/

# Install server dependencies
RUN npm install

# Uninstall bcrypt (if required) and reinstall
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Install the concurrently package
RUN npm install -g concurrently

# Change directory to client
WORKDIR /home/node/app/client

# Install client dependencies
COPY client/package.json /home/node/app/client/
COPY client/package-lock.json /home/node/app/client/
RUN npm install

# Change back to the server directory
WORKDIR /home/node/app

# Set the command to run both server and client
CMD concurrently "npm run dev" --names "SERVER,CLIENT"

# Expose the necessary ports
EXPOSE 9999
