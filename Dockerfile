# Use official Node.js LTS image as base
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first for caching dependencies
COPY package*.json ./

# Install dependencies (including Playwright)
RUN npm ci

# Install Playwright browsers (required for tests)
RUN npx playwright install --with-deps

# Copy rest of the app source code
COPY . .

# Build the project (if you have a build step)
RUN npm run build

# Default command to run tests or your app
# Change this as per your test script or start script
CMD ["npx", "playwright", "test"]

# If you want to expose any port (e.g., for app running)
# EXPOSE 3000
