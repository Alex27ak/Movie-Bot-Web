# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your server will run on (change if necessary)
EXPOSE 3000

# Set environment variables (you can override them later)
ENV NODE_ENV=production

# Start the app (adjust the entrypoint if needed)
CMD ["node", "bot/server.js"]
