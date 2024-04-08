# Base stage to create the base image from Node.js Alpine image
FROM node:18-alpine AS base

# Installing pnpm globally in the base image
RUN npm i -g pnpm

# Stage to install development dependencies
FROM base AS dependencies

# Setting the working directory in the image
WORKDIR /app

# Copying package.json and pnpm-lock.yaml files into the working directory
COPY package.json pnpm-lock.yaml ./

# Installing dependencies using pnpm
RUN pnpm install

# Stage to build the application
FROM base AS build

# Setting the working directory in the image
WORKDIR /app

# Copying all files from the local directory into the working directory of the image
COPY . .

# Copying installed dependencies from the previous stage into the node_modules directory of the image
COPY --from=dependencies /app/node_modules ./node_modules

# Running the application build command
RUN pnpm build

# Removing development dependencies from node_modules to reduce the size of the image
RUN pnpm prune --prod

# Stage for deploying the application
FROM base AS deploy

# Setting the working directory in the image
WORKDIR /app

# Copying the build files (usually in a dist/ directory) into the dist/ directory of the image
COPY --from=build /app/dist/ ./dist/

# Copying the remaining dependencies into the node_modules directory of the image
COPY --from=build /app/node_modules ./node_modules

# Defining the default command to start the application
CMD [ "node", "dist/main.js" ]
