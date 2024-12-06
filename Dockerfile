ARG arch

# Stage 1: Build the application
FROM --platform=linux/${arch} node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install
RUN yarn global add @vercel/ncc

# Copy the rest of the application code
COPY . .

# Build the application with ncc
RUN yarn build

# Stage 2: Create a lightweight image to run the app
FROM --platform=linux/${arch} node:20-alpine

RUN apk --no-cache add curl

# Set working directory
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./

# Expose the application's port
EXPOSE 3000

WORKDIR /usr/src/app

# Set the default command to run the application
CMD ["node", "dist/index.js"]