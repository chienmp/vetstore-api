# Active Context

## Current Work Focus

Building authentication system using email/username and social login (Google, Facebook).

Securing API routes using JWT and handling 401 errors when tokens expire.

## Recent Changes

Created User, Product, and Manufacturer models in Prisma.

Implemented login using JWT (access + refresh tokens).

Integrated Google and Facebook login strategies via Passport.

Completed login UI using shadcn/ui and sonner for toast notifications.

## Next Steps

Implement /auth/refresh endpoint to handle token renewal.

Add user roles (admin, staff...) and role-based access control.

Build permission guards for protected admin routes.

Add barcode scanning functionality for products.

## Active Decisions and Considerations

Considering saving refreshToken in the database for full logout support.

Using separate Prisma migrations per model for easier schema tracking.

## Important Patterns and Preferences

JwtStrategy is located in auth/strategies/jwt.strategy.ts.

Features are modularized (e.g., auth, products, manufacturers).

class-validator is configured to inject PrismaService via useContainer().

Folders for guards, strategies, and decorators are kept organized.

## Learnings and Project Insights

PrismaService must be provided globally for use in custom validators.

Using one migration per model makes rollback and debugging easier.

Combining shadcn/ui + sonner provides clean and efficient user experience.

Social login requires handling duplicated emails and updating existing users when needed.

*(This file tracks the current state of the project, recent changes, and next steps.)*
