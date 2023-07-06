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

# Change directory to the client folder
WORKDIR /home/node/app/public

# Set the command to run the client
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
