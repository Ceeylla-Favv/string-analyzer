# Use a Node image
FROM node:18 AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Build the project
RUN pnpm run build

# ---- Production image ----
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

# Install pnpm again (optional but safe)
RUN npm install -g pnpm

# Copy built assets and node_modules from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json pnpm-lock.yaml ./

# Expose NestJS port
EXPOSE 3000

# Command to run the app
CMD ["pnpm", "run", "start:prod"]
