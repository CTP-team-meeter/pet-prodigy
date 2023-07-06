# Build the client
FROM node:14 AS client-builder
WORKDIR /home/node/app/client
COPY client/package*.json ./
RUN npm ci
COPY client .
RUN npm run build

# Build the server
FROM node:14 AS server-builder
WORKDIR /home/node/app/server
COPY server/package*.json ./
RUN npm ci
COPY server .

# Final image
FROM node:14
WORKDIR /home/node/app

# Copy built client files
COPY --from=client-builder /home/node/app/client/build ./client/build

# Copy built server files
COPY --from=server-builder /home/node/app/server/dist ./server/dist
COPY --from=server-builder /home/node/app/server/package*.json ./server/

# Install server dependencies
WORKDIR /home/node/app/server
RUN npm ci --only=production

# Expose the necessary ports
EXPOSE 9999

# Start the server
CMD ["npm", "start"]
