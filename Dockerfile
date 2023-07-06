# Use a Node.js 14 base image
FROM node:14

# Set the working directory
WORKDIR /home/node/app

# Copy the client files
COPY client/package.json /home/node/app/
COPY client/package-lock.json /home/node/app/
COPY client/public /home/node/app/public/
COPY client/src /home/node/app/public/src

# Install client dependencies
RUN npm install

# Change directory to the server folder
WORKDIR /home/node/app/server

# Copy the server files
COPY server/package.json /home/node/app/server/
COPY server/package-lock.json /home/node/app/server/
COPY server /home/node/app/server/

# Install server dependencies
RUN npm install

# Uninstall bcrypt (if required) and reinstall
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Change back to the root directory
WORKDIR /home/node/app

# Install the concurrently package
RUN npm install -g concurrently

# Install nodemon globally
RUN npm install -g nodemon

# Expose the necessary ports
EXPOSE 9999

# Set the command to run both client and server
CMD concurrently "cd public && npm start" "cd server && concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
