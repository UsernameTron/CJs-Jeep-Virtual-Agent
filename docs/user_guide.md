# Jeep Specifications User Guide

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jeep-specs.git
   cd jeep-specs
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the database:
   ```bash
   # Create PostgreSQL database
   createdb jeep_specs
   
   # Set environment variables
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Usage

1. Start the backend server:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - API Documentation: http://localhost:8000/docs

## Troubleshooting

Common issues and solutions:

1. Database Connection Issues
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

2. API Errors
   - Check API logs for detailed error messages
   - Verify VIN format is correct
   - Ensure all required fields are provided

3. Frontend Issues
   - Clear browser cache
   - Check console for JavaScript errors
   - Verify API endpoint configuration

## Production Deployment

### Backend Deployment

1. Set up production environment:
   ```bash
   # Set production environment variables
   export DATABASE_URL="postgresql://user:password@host:5432/jeep_specs"
   export DEBUG=0
   export VIN_API_KEY="your-api-key"
   ```

2. Install production dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   pip install gunicorn
   ```

3. Run production server:
   ```bash
   gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

### Frontend Deployment

1. Build production assets:
   ```bash
   cd frontend
   npm run build
   ```

2. Configure environment:
   ```bash
   # Create production environment file
   cp .env.example .env.production
   # Edit .env.production with production API URL
   ```

3. Serve built assets:
   ```bash
   # Using nginx configuration
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Database Setup

1. Production database initialization:
   ```bash
   # Create production database
   createdb jeep_specs_prod
   
   # Run migrations
   cd backend
   alembic upgrade head
   ```

### Security Considerations

1. Enable HTTPS:
   - Install SSL certificate
   - Configure nginx for HTTPS
   - Enable HSTS

2. Set secure headers:
   - Configure CSP
   - Enable XSS protection
   - Set CORS policies

3. Database security:
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access

### Monitoring

1. Set up logging:
   ```bash
   # Configure logging
   mkdir /var/log/jeep-specs
   touch /var/log/jeep-specs/api.log
   touch /var/log/jeep-specs/error.log
   ```

2. Monitor system health:
   - Set up health check endpoints
   - Configure uptime monitoring
   - Set up error alerting

### Backup Procedures

1. Database backups:
   ```bash
   # Daily backup script
   pg_dump jeep_specs_prod > backup_$(date +%Y%m%d).sql
   ```

2. Configure automated backups:
   - Set up cron jobs
   - Configure backup retention
   - Test backup restoration 