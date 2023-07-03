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

# Change directory to the public folder
WORKDIR /home/node/app/public

# Copy the client files
COPY client/package.json /home/node/app/public/
COPY client/package-lock.json /home/node/app/public/
COPY client/public /home/node/app/public/
COPY client/src /home/node/app/public/src

# Install client dependencies
RUN npm install

# Change back to the server directory
WORKDIR /home/node/app

# Set the command to run both server and client
CMD concurrently "npm run dev" --names "SERVER,CLIENT"

# Expose the necessary ports
EXPOSE 9999
