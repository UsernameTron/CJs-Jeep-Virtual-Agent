# Environment Configuration Guide

## Overview
This document details all environment variables and configuration settings for the Jeep Specifications application across different environments.

## Environment Files

### Location
```
project_root/
├── backend/
│   ├── .env                 # Local development
│   ├── .env.example        # Template file
│   └── .env.test           # Testing environment
└── frontend/
    ├── .env                # Local development
    ├── .env.production     # Production settings
    └── .env.staging        # Staging settings
```

## Backend Configuration

### Required Environment Variables

```bash
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/jeep_specs"
DATABASE_POOL_SIZE=5
DATABASE_MAX_OVERFLOW=10

# API Configuration
API_V1_STR="/api"
PROJECT_NAME="Jeep Vehicle Specifications"
DEBUG=True  # Set to False in production

# Security
SECRET_KEY="your-secret-key-here"
ALLOWED_HOSTS="localhost,127.0.0.1"
CORS_ORIGINS="http://localhost:5173,http://localhost:3000"

# External Services
VIN_API_KEY="your-vin-api-key"
```

### Environment-Specific Settings

#### Development (.env)
```bash
DEBUG=True
LOG_LEVEL=DEBUG
DATABASE_URL="postgresql://user:password@localhost:5432/jeep_specs_dev"
```

#### Testing (.env.test)
```bash
DEBUG=True
LOG_LEVEL=DEBUG
DATABASE_URL="postgresql://user:password@localhost:5432/jeep_specs_test"
TESTING=True
```

#### Production (.env.production)
```bash
DEBUG=False
LOG_LEVEL=INFO
DATABASE_URL="postgresql://user:password@production-db:5432/jeep_specs_prod"
ALLOWED_HOSTS="api.yoursite.com"
CORS_ORIGINS="https://yoursite.com"
```

## Frontend Configuration

### Environment Variables

```bash
# API Configuration
VITE_API_URL="http://localhost:8000"
VITE_API_TIMEOUT=5000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=true

# UI Configuration
VITE_MAX_UPLOAD_SIZE=5242880  # 5MB in bytes
VITE_DEFAULT_THEME="light"
```

### Environment-Specific Settings

#### Development (.env)
```bash
VITE_API_URL="http://localhost:8000"
VITE_ENV="development"
VITE_ENABLE_MOCK_API=true
```

#### Staging (.env.staging)
```bash
VITE_API_URL="https://api-staging.yoursite.com"
VITE_ENV="staging"
VITE_ENABLE_ERROR_REPORTING=true
```

#### Production (.env.production)
```bash
VITE_API_URL="https://api.yoursite.com"
VITE_ENV="production"
VITE_ENABLE_ANALYTICS=true
```

## Configuration Management

### Setting Up Local Environment

1. Copy example files:
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp frontend/.env.example frontend/.env
   ```

2. Update variables:
   ```bash
   # Edit backend/.env
   nano backend/.env
   
   # Edit frontend/.env
   nano frontend/.env
   ```

### Validation

The application validates environment variables on startup:

```python
# backend/app/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    API_V1_STR: str = "/api"
    DEBUG: bool = False
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### Security Considerations

1. **Secret Management**:
   - Never commit .env files to version control
   - Use secret management services in production
   - Rotate sensitive keys regularly

2. **Access Control**:
   - Restrict .env file permissions
   ```bash
   chmod 600 .env
   ```
   - Use separate credentials per environment

## Deployment Configuration

### Docker Environment

```yaml
# docker-compose.yml
services:
  backend:
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/jeep_specs
      - DEBUG=0
      - API_V1_STR=/api
  
  frontend:
    environment:
      - VITE_API_URL=http://api.yoursite.com
      - VITE_ENV=production
```

### CI/CD Configuration

```yaml
# GitHub Actions example
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  VIN_API_KEY: ${{ secrets.VIN_API_KEY }}
```

## Troubleshooting

### Common Issues

1. **Database Connection**:
   - Verify DATABASE_URL format
   - Check database credentials
   - Ensure database server is running

2. **API Configuration**:
   - Verify API endpoints match VITE_API_URL
   - Check CORS settings
   - Validate API key permissions

3. **Environment Loading**:
   - Confirm .env file location
   - Check file permissions
   - Verify variable naming

### Environment Validation Script

```bash
#!/bin/bash
# scripts/check_env.sh

required_vars=("DATABASE_URL" "SECRET_KEY" "VIN_API_KEY")

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

echo "Environment validation passed"
``` 