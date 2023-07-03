# Use a Node.js 14 base image
FROM node:14

# Set the working directory
WORKDIR /home/node/app

# Copy the server files
COPY server/package.json server/package-lock.json /home/node/app/
COPY server /home/node/app/server/

# Install server dependencies
RUN npm install

# Uninstall bcrypt (if required) and reinstall
RUN npm uninstall bcrypt
RUN npm install --force bcrypt

# Install the concurrently package globally
RUN npm install -g concurrently

# Change directory to the client folder
WORKDIR /home/node/app/public

# Copy the client files
COPY client/package.json client/package-lock.json /home/node/app/public/
COPY client/public /home/node/app/public/public/
COPY client/src /home/node/app/public/src

# Install client dependencies
RUN npm install

# Change back to the server directory
WORKDIR /home/node/app

# Expose the necessary port
EXPOSE 9999

# Set the command to run both server and client
CMD concurrently "npm run dev" --names "SERVER,CLIENT"
