# Use official Playwright image with all dependencies
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (assumes package-lock.json is present)
RUN npm ci

# Copy the rest of the project files
COPY . .

# Install Playwright browsers (if not already preinstalled in the base image)
RUN npx playwright install --with-deps

# Run tests by default (you can override this in Jenkins)
CMD ["npx", "playwright", "test"]
