

# ---- Builder Stage ----
FROM debian:stable-slim AS builder

# Install Rust and build dependencies
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        curl \
        ca-certificates \
        clang \
        libclang-dev \
        llvm-dev \
        libncursesw6 \
        cmake \
        build-essential \
        git \
        libssl-dev \
        pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /usr/src/epicboxlib_source

# Copy the binary crate and its library dependency
COPY epicboxlib_source/Cargo.toml ./Cargo.toml
COPY epicboxlib_source/Cargo.lock ./Cargo.lock
COPY epicboxlib_source/src ./src
COPY epicboxlib_source/epicboxlib ./epicboxlib
# Copy epic-wallet submodule and its dependencies for local path resolution
COPY epicboxlib_source/epic-wallet ./epic-wallet

RUN cargo build --release

# ---- Runtime Stage ----
FROM debian:stable-slim

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        locales \
        openssl \
        libncursesw6 \
        nodejs \
        npm \
    && rm -rf /var/lib/apt/lists/*

RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8

WORKDIR /usr/src/app

# Copy Node.js app files
COPY package*.json ./
COPY . .

# Copy default_config.json as config.json for app compatibility
COPY default_config.json ./config.json

# Copy the Rust binary from the builder stage
COPY --from=builder /usr/src/epicboxlib_source/target/release/epicboxlib ./epicboxlib

RUN chmod +x ./epicboxlib

# Install Node.js dependencies
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
