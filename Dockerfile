# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port (should match your server)
EXPOSE 9000

# Start the server
CMD [ "node", "server.js" ]
