# API Error Handling Documentation

## Overview
This document outlines the error handling patterns and error responses in the Jeep Specifications API.

## Error Response Format

All API errors follow a consistent JSON format:

```json
{
    "error": {
        "code": "ERROR_CODE",
        "message": "Human readable error message",
        "details": {
            "field": "Additional error context"
        }
    }
}
```

## HTTP Status Codes

### Common Status Codes

| Code | Description | Usage |
|------|-------------|-------|
| 200  | OK | Successful request |
| 201  | Created | Resource successfully created |
| 400  | Bad Request | Invalid input parameters |
| 401  | Unauthorized | Missing or invalid authentication |
| 403  | Forbidden | Insufficient permissions |
| 404  | Not Found | Resource not found |
| 422  | Unprocessable Entity | Validation error |
| 500  | Internal Server Error | Server-side error |

## Error Codes

### Vehicle-Related Errors

```json
{
    "VIN_NOT_FOUND": {
        "status": 404,
        "message": "Vehicle with specified VIN not found"
    },
    "INVALID_VIN_FORMAT": {
        "status": 400,
        "message": "Invalid VIN format"
    },
    "DUPLICATE_VIN": {
        "status": 400,
        "message": "Vehicle with this VIN already exists"
    }
}
```

### Maintenance Errors

```json
{
    "MAINTENANCE_NOT_FOUND": {
        "status": 404,
        "message": "Maintenance record not found"
    },
    "INVALID_SERVICE_DATE": {
        "status": 400,
        "message": "Service date cannot be in the future"
    },
    "INVALID_MILEAGE": {
        "status": 400,
        "message": "Mileage must be greater than last recorded service"
    }
}
```

### Tire-Related Errors

```json
{
    "TIRE_SPEC_NOT_FOUND": {
        "status": 404,
        "message": "Tire specifications not found"
    },
    "INVALID_ROTATION_DATE": {
        "status": 400,
        "message": "Rotation date cannot be in the future"
    },
    "INVALID_TIRE_SIZE": {
        "status": 400,
        "message": "Invalid tire size format"
    }
}
```

## Error Handling Examples

### Request Validation

```python
@app.post("/api/vehicles/{vin}/service")
async def record_service(
    vin: str,
    service: ServiceRecord,
    db: Session = Depends(get_db)
):
    try:
        return crud.record_service(db, vin, service)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "INVALID_SERVICE_DATA",
                "message": str(e)
            }
        )
    except VehicleNotFound:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "VIN_NOT_FOUND",
                "message": f"Vehicle with VIN {vin} not found"
            }
        )
```

### Database Errors

```python
try:
    db.commit()
except IntegrityError:
    db.rollback()
    raise HTTPException(
        status_code=400,
        detail={
            "code": "DATABASE_ERROR",
            "message": "Could not save record due to constraint violation"
        }
    )
```

## Client-Side Error Handling

### Frontend Error Interceptor

```typescript
// API client configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { status, data } = error.response;
            
            switch (status) {
                case 401:
                    // Handle authentication errors
                    break;
                case 403:
                    // Handle permission errors
                    break;
                case 404:
                    // Handle not found errors
                    break;
                default:
                    // Handle other errors
            }
        }
        return Promise.reject(error);
    }
);
```

## Error Logging

### Backend Logging

```python
# Error logging configuration
logger = logging.getLogger(__name__)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP error occurred: {exc.detail}", extra={
        "status_code": exc.status_code,
        "path": request.url.path,
        "method": request.method
    })
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )
```

### Frontend Error Reporting

```typescript
// Error boundary component
class ErrorBoundary extends React.Component {
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logger.error('UI Error:', {
            error: error,
            component: errorInfo.componentStack
        });
    }

    render() {
        return this.props.children;
    }
}
```

## Best Practices

1. **Consistent Error Format**
   - Always use the standard error response format
   - Include meaningful error codes
   - Provide human-readable messages

2. **Security Considerations**
   - Don't expose sensitive information in error messages
   - Sanitize error details before logging
   - Use appropriate status codes

3. **Validation**
   - Validate input data before processing
   - Return detailed validation errors
   - Include field-specific error messages

4. **Documentation**
   - Keep error codes updated
   - Document new error scenarios
   - Include error handling in API documentation 