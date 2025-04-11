# Use Node.js Alpine for build stage with all dev tools
FROM node:22.12.0-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Add args
ARG BASE_URL
ARG MOCK_SERVICE_WORKER
ARG FIREBASE_APIKEY
ARG FIREBASE_AUTHDOMAIN
ARG FIREBASE_PROJECTID
ARG FIREBASE_STORAGEBUCKET
ARG FIREBASE_MESSAGINGSENDERID
ARG FIREBASE_APPID

# Use the args to create environment variables
ENV BASE_URL=${BASE_URL}
ENV MOCK_SERVICE_WORKER=${MOCK_SERVICE_WORKER}
ENV FIREBASE_APIKEY=${FIREBASE_APIKEY}
ENV FIREBASE_AUTHDOMAIN=${FIREBASE_AUTHDOMAIN}
ENV FIREBASE_PROJECTID=${FIREBASE_PROJECTID}
ENV FIREBASE_STORAGEBUCKET=${FIREBASE_STORAGEBUCKET}
ENV FIREBASE_MESSAGINGSENDERID=${FIREBASE_MESSAGINGSENDERID}
ENV FIREBASE_APPID=${FIREBASE_APPID}

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies using clean install for reproducibility
RUN npm ci

# Copy entire project to container
COPY . .

# Build the Nuxt application
RUN npm run build

# Use distroless Node.js image for production for minimal, secure runtime
FROM node:22.12.0-alpine AS prod

# Set working directory in production container
WORKDIR /app

# Copy built output from build stage to production container
COPY --from=build /app/.output ./.output

# Expose port the app will run on
EXPOSE 3001

# Command to start the Nuxt server from built output
CMD ["./.output/server/index.mjs"]
