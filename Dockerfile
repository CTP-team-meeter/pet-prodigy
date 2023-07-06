# Use a Node.js 14 base image
FROM node:14

# Set the working directory
WORKDIR /home/node/app

# Copy the server files
COPY server /home/node/app/

# Install server dependencies
RUN npm install

# Uninstall bcrypt (if required) and reinstall
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Change directory to the public folder
WORKDIR /home/node/app/public

# Copy the client files
COPY client/package.json /home/node/app/public/
COPY client/package-lock.json /home/node/app/public/
COPY client/public /home/node/app/public/
COPY client/src /home/node/app/public/src


# Install the concurrently package
RUN npm install -g concurrently

# Install client dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Change back to the server directory
WORKDIR /home/node/app

# Expose the necessary ports
EXPOSE 9999

# Set the command to run both server and client
CMD concurrently "npx tsc --watch" "nodemon -q dist/index.js"
