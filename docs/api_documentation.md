# API Documentation

## Base URL
All API endpoints are prefixed with `/api`

## Endpoints

### Vehicles

#### GET /vehicles/{vin}
Retrieves vehicle specifications by VIN.

**Parameters:**
- `vin` (path): Vehicle Identification Number

**Response:**
```json
{
    "vin": "string",
    "make": "string",
    "model": "string",
    "year": "integer",
    "engine_specs": {
        "type": "string",
        "displacement": "float",
        "horsepower": "integer"
    },
    "capacity": {
        "payload": "integer",
        "towing": "integer",
        "passengers": "integer"
    }
}
```

#### POST /vehicles/
Creates a new vehicle record.

**Request Body:**
```json
{
    "vin": "string",
    "make": "string",
    "model": "string",
    "year": "integer",
    // ... other vehicle details
}
```

### Maintenance

#### GET /vehicles/{vin}/maintenance
Retrieves maintenance schedule for a vehicle.

**Parameters:**
- `vin` (path): Vehicle Identification Number

#### POST /vehicles/{vin}/service
Records a service performed on the vehicle.

**Request Body:**
```json
{
    "service_type": "string",
    "date": "string (ISO 8601)",
    "mileage": "integer",
    "notes": "string"
}
```

### Calculations

#### GET /vehicles/{vin}/calculations/payload
Calculates available payload based on occupants.

**Parameters:**
- `vin` (path): Vehicle Identification Number
- `occupants` (query): Number of occupants

### Tire Management

#### GET /vehicles/{vin}/tires/rotation-status
Checks tire rotation status.

**Parameters:**
- `vin` (path): Vehicle Identification Number
- `current_mileage` (query): Current vehicle mileage

#### POST /vehicles/{vin}/tires/record-rotation
Records a tire rotation service.

**Request Body:**
```json
{
    "mileage": "integer",
    "date": "string (ISO 8601)"
}
```

## Error Responses

All endpoints may return the following errors:

```json
{
    "detail": "Error message"
}
```

Common Status Codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error 