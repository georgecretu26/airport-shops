# Stage 1: Build the application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and lockfile
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install pnpm and turbo globally
RUN npm install -g pnpm turbo
RUN corepack enable pnpm
RUN pnpm config set store-dir ~/.pnpm-store

# Install dependencies
RUN pnpm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Stage 2: Run the application
FROM node:20 AS run

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app ./

# Install only production dependencies
RUN pnpm install --prod

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application
RUN ls -la
CMD ["pnpm", "start", "--filter", "./apps/frontend"]
