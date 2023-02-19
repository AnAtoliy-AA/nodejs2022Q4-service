FROM node:18.14-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Copy current directory to APP folder
COPY . /app/

EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]