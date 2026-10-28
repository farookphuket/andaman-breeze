# ==============================================================================
# Andaman Breeze Project - Master Automation Makefile
# Designed for Arch Linux + Tmux + Neovim workflow
# ==============================================================================

# Export host user ID and group ID to match inside container (Prevents root permission issues)
export HOST_UID := $(shell id -u)
export HOST_GID := $(shell id -g)

.PHONY: up down restart build install migrate seed status shell-backend shell-frontend logs

# Start all containers in detached mode
up:
	@echo "🚀 Starting Andaman Breeze containers..."
	HOST_UID=$(HOST_UID) HOST_GID=$(HOST_GID) docker compose up -d

# Stop all containers
down:
	@echo "🛑 Stopping containers..."
	docker compose down

# Restart all services
restart: down up

# Build or rebuild services with current Host User permissions
build:
	@echo "🛠️ Building containers with UID: $(HOST_UID) and GID: $(HOST_GID)..."
	HOST_UID=$(HOST_UID) HOST_GID=$(HOST_GID) docker compose build --no-cache

# Run initial deployment dependencies setup
install:
	@echo "📦 Installing Backend & Frontend dependencies..."
	docker compose exec -u www-data backend composer install
	docker compose exec frontend npm install



# Display current status of containers
status:
	docker compose ps


# Run pending database migrations without dropping existing tables
migrate:
	@echo "🗄️ Running pending database migrations..."
	docker compose exec -u www-data backend php artisan migrate

# Run database seeders separately
seed:
	@echo "🌱 Running database seeders..."
	docker compose exec -u www-data backend php artisan db:seed

# View real-time aggregated logs
logs:
	docker compose logs -f

# SSH-like interactive shell into Backend
shell-backend:
	docker compose exec -u www-data backend bash

# SSH-like interactive shell into Frontend
shell-frontend:
	docker compose exec frontend sh
