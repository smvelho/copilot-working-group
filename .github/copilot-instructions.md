# GitHub Copilot Instructions for Copilot Working Group Workshops

## Project Overview
This is a hands-on workshop repository for learning and practicing GitHub Copilot. The project is built with:
- **Framework**: React 19 with Vite
- **Language**: TypeScript
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **Testing**: Vitest with React Testing Library
- **Linting**: ESLint 9

## Available Commands

### Development
- `npm run dev` - Start the Vite development server with hot module replacement
- `npm run preview` - Preview the production build locally

### Building
- `npm run build` - Build the project for production (includes TypeScript type checking via `tsc -b`)

### Code Quality
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run lint:fix` - Run ESLint and automatically fix issues where possible

### Testing
- `npm run test` - Run all tests with Vitest

### Type Checking
Type checking is performed automatically during the build process (`npm run build`). You can also run `tsc -b` directly to check types without building.

## Project Structure
- `/src` - Application source code
- `/assets` - Static assets like images
- `vite.config.ts` - Vite configuration
- `eslint.config.js` - ESLint configuration
- `tsconfig.*.json` - TypeScript configuration files

## Development Workflow
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Run tests: `npm run test`
4. Lint code: `npm run lint`
5. Build for production: `npm run build`

## Coding Guidelines
- Follow the existing TypeScript and React patterns in the codebase
- Use TypeScript for all new files
- Write tests for new functionality using Vitest and React Testing Library
- Ensure code passes ESLint checks before committing
- Use React 19 features and patterns
- Leverage TanStack Router for routing
- Use TanStack Query for data fetching and state management
