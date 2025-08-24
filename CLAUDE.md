# CLAUDE.md

必ず日本語で回答してください。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an engineer-business matching platform with separate frontend applications for businesses and talent (engineers). The architecture consists of a Rails API backend and Next.js frontend applications.

## Development Commands

### Frontend (from `/frontend` directory)

- **Development**: `pnpm dev` - Starts all apps in development mode
- **Build**: `pnpm build` - Builds all applications
- **Lint**: `pnpm lint` - Runs ESLint with zero warnings tolerance
- **Type Check**: `pnpm check-types` - TypeScript type checking
- **Format**: `pnpm format` - Formats code with Prettier
- **E2E Tests**: `pnpm test:e2e` - Runs Playwright tests
- **API Spec Generation**: `pnpm gen:api-spec` - Generates TypeSpec API definitions
- **Client Generation**: `pnpm gen:client` - Generates API client from OpenAPI spec

### Individual Apps

- **Business App**: Runs on port 3001 (dev), 3101 (test)
- **Talent App**: Runs on port 3000 (dev), 3100 (test)

### Backend (from `/api-server` directory)

- **Development**: `rails server` - Starts Rails API server on port 4000
- **Test**: `rspec` - Runs RSpec test suite
- **Database Migration**: `rails ridgepole:apply` - Applies database schema changes
- **Lint**: `rubocop` - Ruby code linting
- **Security Scan**: `brakeman` - Static security analysis

### Full E2E Testing

Use the provided script: `./run-e2e-local.sh` - Sets up test environment and runs all E2E tests

## Architecture

### Frontend Structure

- **Monorepo**: Uses pnpm workspaces with Turbo for build orchestration
- **Apps**: Separate Next.js applications for `business` and `talent` users
- **Features**: Feature-based organization with actions, components, queries, and types
- **API Integration**: TypeSpec → OpenAPI → Orval for type-safe API clients
- **State Management**: TanStack Query for server state with custom query factory pattern
- **UI**: Tailwind CSS with shared components

### Backend Structure

- **Rails API**: Rails 8.0 API-only application
- **Database**: MySQL with Ridgepole for schema management
- **Authentication**: JWT-based auth with separate endpoints for business/talent
- **File Uploads**: Shrine with AWS S3 (LocalStack for development)
- **Serialization**: Active Model Serializers with JSON API format

### Key Patterns

- **Feature Organization**: Each frontend feature contains actions, components, queries, and types
- **Query Factory**: Custom TanStack Query factory for consistent API interactions (`frontend/libs/queryFactory.ts`)
- **Dual User Types**: Separate namespaces and controllers for business and talent users
- **Type Safety**: End-to-end type safety from API spec to frontend consumption

### Environment Setup

- **Docker**: Full development environment with `docker-compose.yaml`
- **Database**: MySQL 8.0 with custom configuration
- **S3**: LocalStack for file storage development
- **Ports**: API (4000/4100), Business (3001/3101), Talent (3000/3100)

### Testing

- **Backend**: RSpec with FactoryBot for API testing
- **Frontend**: Playwright for E2E testing with fixtures
- **API Contract**: TypeSpec definitions ensure API/frontend alignment
