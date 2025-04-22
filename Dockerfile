# Use official Node.js image from Docker Hub
FROM node:22.13.1

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the application files
COPY . .

# Expose the port your app will run on (change 3000 to the actual port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
