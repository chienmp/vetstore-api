# System Patterns

## System Architecture

Monolithic NestJS backend structured by feature-based modules (auth, products, manufacturers, etc.).

Uses PostgreSQL via Prisma ORM as the data layer.

RESTful API structure with JWT-based authentication and role-based access planned.

Authentication supports email/username, Google, and Facebook login.

Deployed as a single server initially, but structured to allow future service extraction.


## Key Technical Decisions

✅ NestJS + Prisma chosen for maintainability, modular architecture, and type-safety.

✅ JWT authentication for stateless API protection, with short-lived accessToken and long-lived refreshToken.

✅ Using shadcn/ui for frontend (login form) for better UX consistency.

✅ Designed each database model to have separate Prisma migrations for easier tracking and debugging.

✅ Global module (SharedModule) used to share PrismaService and validators.

## Design Patterns in Use

Strategy Pattern for PassportStrategy implementations (JWT, Google, Facebook).

Guard Pattern for securing routes (JwtAuthGuard).

Validation Decorator Pattern using class-validator and custom decorators (@IsEntityExists).

Dependency Injection throughout services, using NestJS built-in container.

Modular Monolith: structured by domain (auth, product, etc.), but within a monolithic codebase.


## Component Relationships

AuthController ↔ AuthService ↔ JwtService, PrismaService

ProductsController ↔ ProductsService ↔ PrismaService

JwtStrategy extracts sub, injects into req.user via Passport

Custom validators and DTOs depend on PrismaService via global SharedModule

Frontend (LoginPage) interacts with API via REST calls, receives and stores JWT tokens.

## Critical Implementation Paths

Login flow:

/auth/login → validate credentials → issue JWTs

/auth/google / /auth/facebook → redirect flow → validate or create user → issue tokens

Token validation:

JWT extracted via Bearer header → validated by JwtStrategy

On failure, 401 Unauthorized is returned

Product creation:

Validates manufacturerId exists → creates product with relation

All mutations require authenticated token

*(This file documents the system's architecture, design patterns, and key technical decisions.)*
