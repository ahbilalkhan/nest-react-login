# ARG REACT_APP_BASE_API_URL
# ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL

# Use an official Node.js runtime as the base image
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Build the app for production
RUN npm run build

# Use Nginx as the base image for serving the app
FROM nginx:latest

# Copy the built app to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3001 for Nginx
EXPOSE 3001

CMD ["npm", "start"]
