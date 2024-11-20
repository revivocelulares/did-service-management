# Use Node.js 18 Alpine as base image for smaller size
FROM node:18-alpine

# Add necessary packages for building native dependencies
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code
COPY src/ ./src/

# Build TypeScript code
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Remove source code and build tools
RUN rm -rf src/ tsconfig.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Set user to non-root
USER node

# Start the application
CMD ["node", "--experimental-specifier-resolution=node", "dist/index.js"]