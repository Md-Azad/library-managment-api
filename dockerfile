# # Stage: Development
# FROM node:18-alpine

# # Create app directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install all dependencies including devDependencies
# RUN npm install

# # Copy the entire project
# COPY . .

# # Expose port (change if needed)
# EXPOSE 5000

# # Run in development mode using ts-node-dev
# CMD ["npm", "run", "dev"]

# -------- Stage 1: Build Stage --------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build

# -------- Stage 2: Production Stage --------
FROM node:22-alpine AS production

WORKDIR /app

# Copy only the built JavaScript and necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev

# Expose API port
EXPOSE 5000

# Start the app
CMD ["npm","run","start:prod"]

