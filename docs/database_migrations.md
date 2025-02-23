# Database Migration Guide

## Overview
This project uses Alembic for database migrations with PostgreSQL. Migrations help track, version, and modify the database schema over time.

## Setup

1. Initialize Alembic (already done in repository):
   ```bash
   cd backend
   alembic init alembic
   ```

2. Configuration location:
   ```
   backend/
   ├── alembic/
   │   ├── versions/         # Migration version files
   │   ├── env.py           # Alembic environment configuration
   │   └── script.py.mako   # Migration file template
   └── alembic.ini          # Main Alembic configuration
   ```

## Creating Migrations

1. Generate a new migration:
   ```bash
   alembic revision -m "description_of_changes"
   ```

2. For automatic generation based on model changes:
   ```bash
   alembic revision --autogenerate -m "description_of_changes"
   ```

Example migration file:
```python
# alembic/versions/1234567890_add_vehicle_table.py

"""add vehicle table

Revision ID: 1234567890
Revises: 
Create Date: 2024-03-15 10:30:15.126754

"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'vehicles',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('vin', sa.String(length=17), nullable=False),
        sa.Column('make', sa.String(length=50), nullable=False),
        sa.Column('model', sa.String(length=50), nullable=False),
        sa.Column('year', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('vin')
    )

def downgrade():
    op.drop_table('vehicles')
```

## Applying Migrations

1. Apply all pending migrations:
   ```bash
   alembic upgrade head
   ```

2. Apply specific number of migrations:
   ```bash
   alembic upgrade +1  # Apply next migration
   alembic upgrade +2  # Apply next two migrations
   ```

3. Rollback migrations:
   ```bash
   alembic downgrade -1  # Rollback one migration
   alembic downgrade base  # Rollback all migrations
   ```

## Current Migrations

### Version 001: Initial Schema
- Created vehicles table
- Added basic vehicle specifications
- Added maintenance records table

### Version 002: Tire Management
- Added tire specifications table
- Added tire rotation history table
- Added foreign key constraints

### Version 003: Service Records
- Added service records table
- Added service types enum
- Added maintenance schedule table

## Best Practices

1. **Migration Naming**:
   ```bash
   # Format: timestamp_brief_description.py
   20240315_add_vehicle_table.py
   20240316_add_tire_specs.py
   ```

2. **Testing Migrations**:
   ```bash
   # Test upgrade
   alembic upgrade head
   
   # Test downgrade
   alembic downgrade base
   
   # Verify data integrity
   pytest tests/test_migrations.py
   ```

3. **Backup Procedures**:
   ```bash
   # Backup before migration
   pg_dump jeep_specs > backup_before_migration.sql
   
   # Apply migration
   alembic upgrade head
   
   # Verify and backup after
   pg_dump jeep_specs > backup_after_migration.sql
   ```

## Troubleshooting

1. **Migration Conflicts**:
   ```bash
   # View current migration state
   alembic current
   
   # View migration history
   alembic history
   
   # Resolve merge conflicts
   alembic merge heads
   ```

2. **Common Issues**:
   - Database connection errors: Check DATABASE_URL in .env
   - Migration failed: Check alembic logs in alembic/logs
   - Schema mismatch: Compare models.py with current database schema

## Development Workflow

1. Make changes to SQLAlchemy models in `models.py`
2. Generate migration: `alembic revision --autogenerate`
3. Review generated migration file
4. Test migration locally
5. Commit changes
6. Apply migration in staging/production

## Production Deployment

1. **Before Migration**:
   ```bash
   # Backup database
   pg_dump production_db > backup.sql
   
   # Check current version
   alembic current
   ```

2. **Apply Migration**:
   ```bash
   # Run migration
   alembic upgrade head
   
   # Verify changes
   alembic check
   ```

3. **Rollback Plan**:
   ```bash
   # If issues occur
   alembic downgrade -1
   psql < backup.sql
   ``` 