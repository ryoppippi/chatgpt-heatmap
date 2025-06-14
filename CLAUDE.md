# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChatGPT Heatmap - A web app that visualizes ChatGPT conversation history as an interactive heatmap (similar to GitHub's contribution graph). Users upload their exported ChatGPT data and all processing happens client-side.

## Essential Commands

```bash
# Development
pnpm dev                    # Start dev server at http://localhost:3000
pnpm build                  # Build for production
pnpm lint                   # Run ESLint
pnpm format                 # Fix linting issues
pnpm test                   # Run Vitest tests
pnpm test -- filename       # Run specific test file
```

## Architecture

### State Management

Uses Jotai for atomic state management. Main atoms are in `/lib/atom/`:

- `conversationsAtom` - Stores parsed conversation data
- `fileInfoAtom` - Upload file metadata
- `yearAtom` - Selected year for heatmap view

### Data Flow

1. User uploads `conversations.json` via dropzone in `/app/form.tsx`
2. File is parsed and validated using Typia schemas in `/lib/schema.ts`
3. Data stored in Jotai atoms
4. Heatmap component (`/app/activity-heatmap.tsx`) subscribes to atoms and renders visualization using @nivo/calendar

### Key Components

- `ActivityHeatmap` - Main visualization component with year navigation and export functionality
- `ConversationList` - Shows conversations for selected date when user clicks heatmap cell
- `Form` - File upload interface with drag-and-drop support

### Type Safety

The project uses Typia for runtime validation of ChatGPT export data. Main types are in `/lib/schema.ts`:

- `ChatGPTConversation` - Individual conversation structure
- `ChatGPTExport` - Full export file structure

## Development Notes

- Next.js 15 with App Router - all pages/components in `/app` directory
- Tailwind CSS v4 with custom animations defined in `tailwind.config.ts`
- React Compiler enabled (experimental) for optimizations
- Pre-commit hooks run linting on staged files via Husky + lint-staged
