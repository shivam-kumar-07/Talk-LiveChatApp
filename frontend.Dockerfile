# Use an official Nginx image as the base image
FROM nginx:latest

# Copy your frontend files to the Nginx document root
COPY ./frontend /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
