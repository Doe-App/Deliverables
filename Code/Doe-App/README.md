# Doe

A mobile period tracking and cycle insights application built with Expo and React Native.

## About

Doe is a personal health tracking app that helps users monitor their menstrual cycle, track symptoms, and gain insights into their patterns over time. The app features customizable themes, local data storage, and a clean, intuitive interface.

## Features

- Cycle logging with customizable entries
- Period insights and analytics
- Multiple theme options (Sage, Space, Celestial, Chocolate, Doe)
- Account/profile management
- Local SQLite database for offline-first storage

## Tech Stack

- **Framework**: Expo SDK 54 with React Native 0.81
- **Language**: TypeScript
- **Database**: Drizzle ORM with expo-sqlite
- **State Management**: Zustand
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native styling with custom themes

## Prerequisites

- Node.js 18+
- npm or bun
- For iOS: Xcode with iOS Simulator
- For Android: Android Studio with emulator

## Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   cd Doe-App
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

   Or using bun (recommended):

   ```bash
   bun install
   ```

## Running the App

### Development Server

Start the Expo development server:

```bash
npx expo start
```

Or with bun:

```bash
bunx expo start
```

### Running on iOS Simulator

```bash
npx expo run:ios
```

Or with bun:

```bash
bunx expo run:ios
```

### Running on Android Emulator

```bash
npx expo run:android
```

Or with bun:

```bash
bunx expo run:android
```

### Running on Web

```bash
npx expo start --web
```

Or with bun:

```bash
bunx expo start --web
```

## Project Structure

- `app/` - Expo Router pages and layouts (file-based routing)
- `db/` - Database schema and configuration
- `store/` - Zustand state stores
- `services/` - Business logic and API services
- `constants/` - Theme definitions and constants
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)

