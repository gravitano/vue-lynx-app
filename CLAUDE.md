# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue Lynx app bootstrapped with `create-vue-lynx`. Uses Vue 3 Composition API running on the Lynx runtime platform (mobile-like environment) with a web fallback. Built with `@lynx-js/rspeedy`.

## Commands

- `pnpm install` — install dependencies
- `pnpm run dev` — start dev server (generates QR code for LynxExplorer)
- `pnpm run build` — production build to `dist/`
- `pnpm run preview` — preview production build
- `pnpm run check` — lint with Biome
- `pnpm run format` — format with Biome

## Architecture

- **Entry point:** `src/index.ts` — creates the Vue app using `createApp` from `vue-lynx` (not standard `vue`)
- **Build config:** `lynx.config.ts` — dual-target build for `lynx` (native) and `web` environments; Options API is disabled
- **Formatting/linting:** Biome (`biome.json`) — single quotes, 2-space indent, CSS modules enabled

### Key pattern: framework-agnostic logic + Vue composable wrapper

- `src/lib/flappy.ts` — pure physics engine with no framework dependencies
- `src/useFlappy.ts` — Vue composable wrapping the physics engine with reactive state
- `src/App.vue` — single root component using `<script setup>`
