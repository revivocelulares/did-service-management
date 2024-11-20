# DID Management Service

A secure TypeScript-based service for managing Decentralized Identifiers (DIDs) following the W3C DID specification. This service implements the did:key method with ED25519 cryptographic operations.

## Features

- ✨ Create DIDs using the did:key method
- 🔐 ED25519 cryptographic key generation
- 📄 DID document resolution
- 🔒 Secure private key encryption
- 🗄️ MongoDB persistence
- 🐳 Docker deployment support
- 🧪 Comprehensive test suite

## Security Features

- ED25519 for cryptographic operations
- AES-256-GCM encryption for private keys
- Secure key generation using cryptographically secure random numbers
- Private keys are encrypted before storage
- Environment-based encryption key configuration

## Prerequisites

- Node.js 18 or higher
- MongoDB 4.4 or higher
- Docker and Docker Compose (for containerized deployment)

## Installation

1. Clone the repository
2. Create a `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/did-service
   ENCRYPTION_KEY=your-secure-encryption-key
   PORT=3000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

1. Start MongoDB locally or using Docker:
   ```bash
   docker-compose up mongodb
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the test suite:
```bash
npm test
```

## Production Deployment

### Using Docker Compose

1. Set environment variables:
   ```bash
   cp .env.example .env
   ```

2. Build and run services:
   ```bash
   docker-compose up --build
   ```

### Manual Deployment

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### Create DID
- **POST** `/api/did/create`
- Creates a new DID with ED25519 keys
- Returns: DID Document

### Resolve DID
- **GET** `/api/did/resolve/:did`
- Resolves an existing DID
- Returns: DID Document

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/did-service` |
| `ENCRYPTION_KEY` | Key for encrypting private keys | Required |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## Project Structure

```
.
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── services/       # Business logic
│   ├── types/          # TypeScript types
│   ├── routes/         # API routes
│   └── index.ts        # Application entry
├── tests/             # Test files
├── Dockerfile         # Container definition
└── docker-compose.yml # Container orchestration
```
