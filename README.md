# Andaman Breeze Tours

A tour booking platform built with Laravel, Next.js, Tailwind CSS, and PostgreSQL.

## Technology Stack

- **Backend:** Laravel, PHP
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Database:** PostgreSQL
- **Infrastructure:** Docker Compose
- **Languages:** English, Thai, and Chinese

## Project Structure

- `backend/` — Laravel application and API
- `frontend/` — Next.js web application
- `docker/` — Dockerfiles and Nginx configuration
- `docker-compose.yml` — Local development services
- `Makefile` — Development commands

## Development

This repository is intended for local development.

1. Install Docker Engine and the Docker Compose plugin.
2. Review the environment example files.
3. Create the required local environment files without overwriting existing ones.
4. Start and verify the development services using the project’s documented Docker Compose configuration.
5. Run database migrations only after confirming the database connection and current migration state.

Do not commit local environment files, database contents, logs, or generated dependencies.

## Production

Production deployment requires a separate configuration and security review, including environment variables, credentials, application debug settings, network exposure, database access, and backup and recovery procedures.

Development settings are not production settings.
