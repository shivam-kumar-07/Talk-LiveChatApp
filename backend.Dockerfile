# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy your backend files to the container
COPY ./backend /app

# Install backend dependencies
RUN npm install

# Expose port 3000 for your Node.js application
EXPOSE 8001

# Start your Node.js application
CMD ["node", "app.js"]  # Adjust the startup script as needed
