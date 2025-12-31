FROM node:20-alpine

# Install build tools and Rust for native addon
RUN apk add --no-cache build-base python3 rust cargo

WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package*.json ./


# Copy the rest of the source code (including epicboxlib)
COPY . .
# Copy default_config.json as config.json for app compatibility
COPY default_config.json ./config.json

# Ensure all files in epicboxlib are executable
RUN chmod -R +x ./epicboxlib

# Install dependencies and build native modules
RUN npm install --production

# Expose the port epicbox listens on
EXPOSE 3000

CMD ["npm", "start"]
