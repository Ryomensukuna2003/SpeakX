FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Install necessary tools and Node.js
RUN apt update && apt install -y curl build-essential && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt update && apt install -y nodejs

# Install Envoy
RUN apt install wget
RUN apt -y install software-properties-common curl ca-certificates apt-transport-https lsb-release gnupg2
RUN apt install apt-transport-https gnupg2 curl lsb-release
RUN mkdir -p /etc/apt/keyrings && \
    wget -O- https://apt.envoyproxy.io/signing.key | gpg --dearmor -o /etc/apt/keyrings/envoy-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/envoy-keyring.gpg] https://apt.envoyproxy.io focal main" | tee /etc/apt/sources.list.d/envoy.list && \
    apt-get update && \
    apt-get install -y envoy && \
    envoy --version


RUN apt update -y
RUN apt-cache policy
# RUN apt install getenvoy-envoy -y
RUN envoy --version

# Install pnpm globally
RUN npm install -g pnpm

# Copy project files
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY index.js index.js
COPY envoy.yaml envoy.yaml
COPY utils utils
COPY models models
COPY proto  proto

# Install dependencies
RUN pnpm install

# Additional pnpm install with --shamefully-hoist if needed
RUN pnpm install --shamefully-hoist

# Define the command to run your application
CMD ["sh", "-c", "envoy -c envoy.yaml & node index.js"]
