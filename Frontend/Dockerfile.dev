# Base image for development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port and start the development server
EXPOSE 3000
CMD ["npm", "start"]
