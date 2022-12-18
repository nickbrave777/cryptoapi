# syntax=docker/dockerfile:1

FROM node:16
ENV NODE_ENV=production 

# Create App directory
WORKDIR /usr/src/app

# Copy files into work dir
COPY ["package.json", "package-lock.json*", "./"]

# Install all dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Expose the port to have access
EXPOSE 3000

# RUn the node command
CMD [ "node", "index.js" ]
