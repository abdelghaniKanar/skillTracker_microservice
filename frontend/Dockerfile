# Use Node LTS for building
FROM node:20-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve build files
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
