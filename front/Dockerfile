# Use the official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install --no-cache

# Copy the rest of the source code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the port the Next.js app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]