# Red Bull Racing Backend Project

## Author

Developed by Mert Uysal for Red Bull Racing.

## Overview
This is the backend service for a Red Bull Racing project, built using Express.js. The backend supports an API that provides driver data for different F1 seasons and includes a caching system to optimize response times.

> **Important Note:** Pushing an `.env` file is     not acceptable due to security and best practices. However, for this project, there is no alternative way to share it with the reviewer. The `.env` file should be handled with care and deleted after review to maintain security.

## Task 1: Data Fetching & Manipulation Backend

### Features
- **Caching System**: Implemented to cache responses for 5 minutes, reducing the load on the server.
- **Retry Mechanism**: Implements a retry feature that attempts to resend failed requests up to 3 times to improve reliability.
- **Environment Variables**: An `.env` file is required for configuration. However, due to security policies, the file cannot be shared directly with reviewers.
- **Driver Data Endpoint**: Provides season-specific F1 driver data.
- **CORS Handling**: CORS has been configured to manage cross-origin requests effectively.

### API Endpoint
- **GET** `/api/drivers/:season`: Retrieves driver data for the specified season.
- API written in `Node.js` using `Express.js` to serve Formula 1 driver standings data.

### Nodemon
This project uses `nodemon` to automatically restart the server whenever file changes are detected during development. This greatly improves efficiency by eliminating the need to manually stop and start the server after each change.

### Dotenv
This project uses `dotenv` to load environment variables from a `.env` file into `process.env`, enabling secure management of sensitive information and simplifying configuration across different environments.

## Getting Started

### Prerequisites
- **Node.js v18** or higher

### Installation and Running
1. Install dependencies:
   ```bash
   npm install
   ````
2. Start the server:
   ```bash
   npm run start
   ````
   [http://localhost:3001](http://localhost:3001)

### Drivers Endpoint

    http://localhost:3001/api/drivers/:season