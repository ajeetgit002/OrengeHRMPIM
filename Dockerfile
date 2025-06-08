# Use a Node.js + Playwright base image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory inside container
WORKDIR /app

# Copy all files from host to container
COPY . .

# Install dependencies
RUN npm ci

# Run Excel generation first, then run tests
CMD ["sh", "-c", "npx ts-node src/utils/generateExcel.ts && npx cucumber-js features/PIMCreation.feature --tags @smoke"]
