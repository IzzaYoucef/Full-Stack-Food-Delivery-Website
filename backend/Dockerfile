# ---------------------------------------------------
# Stage 1: Build the React application
# ---------------------------------------------------
# Use the current Node.js LTS release as the build environment.
# The "alpine" variant is much smaller, which keeps the image lean
FROM node:24-alpine AS build 

# To prevnt running the app as root  
RUN addgroup app && adduser -S -G app app
# Set the user to run the app 
USER app

# Set the working directory inside the container.
# All subsequent commands run from this path.
WORKDIR /app

# Copy only the dependency manifests first.
# Docker caches layers, so this avoids re-installing
# dependencies every time the source code changes.
COPY --chown=app:app package*.json ./

# Install dependencies with "ci" instead of "install" for
# faster, reproducible builds straight from the lockfile.
RUN npm install

# Copy the rest of the application source code.
COPY --chown=app:app . .

EXPOSE 4000

# Shell form (triggers the warning)
CMD npm start
