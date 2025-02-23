# Frontend Component Documentation

## Overview
This document details the React components used in the Jeep Specifications application.

## Components

### VehicleSpecifications
Main component for displaying vehicle information.

**Props:**
```typescript
{
    vin: string;
    onUpdate?: (vin: string) => void;
}
```

**Usage:**
```tsx
<VehicleSpecifications vin="1234567890" />
```

### PayloadCalculator
Calculates available payload based on vehicle capacity and occupants.

**Props:**
```typescript
{
    vehicle: {
        vin: string;
        capacity: {
            payload: number;
            passengers: number;
        };
    };
}
```

**Methods:**
- `calculateAvailablePayload(occupants: number): number`
- `validateOccupants(count: number): boolean`

### TireRotationTracker
Tracks and displays tire rotation status and recommendations.

**Props:**
```typescript
{
    tireData: {
        last_rotation_date: string;
        last_rotation_miles: number;
        recommended_interval: number;
    };
    currentMileage: number;
}
```

**States:**
- `isOverdue: boolean`
- `nextRotationMiles: number`
- `daysUntilDue: number`

### MaintenanceSchedule
Displays and manages vehicle maintenance schedules.

**Props:**
```typescript
{
    vin: string;
    maintenanceHistory: MaintenanceRecord[];
    onScheduleService?: (service: ServiceRequest) => void;
}
```

**Features:**
- Displays upcoming maintenance
- Shows service history
- Allows scheduling new service

### ServiceRecordForm
Form for recording vehicle service history.

**Props:**
```typescript
{
    vin: string;
    onSubmit: (record: ServiceRecord) => void;
    initialData?: ServiceRecord;
}
```

**Validation:**
- Required fields: service type, date, mileage
- Mileage must be greater than last recorded
- Date cannot be in future

### EngineSpecs
Displays detailed engine specifications.

**Props:**
```typescript
{
    specs: {
        type: string;
        displacement: number;
        horsepower: number;
        torque: number;
        fuelType: string;
    };
}
```

### TireSpecs
Shows tire specifications and recommendations.

**Props:**
```typescript
{
    specs: {
        size: string;
        pressure: number;
        type: string;
        load_rating: string;
    };
    rotationHistory: RotationRecord[];
}
```

## Common Patterns

### Error Handling
All components implement error boundaries and display user-friendly error messages:

```tsx
try {
    // Component logic
} catch (error) {
    return <ErrorDisplay message={error.message} />;
}
```

### Loading States
Components show loading indicators during data fetching:

```tsx
{isLoading ? <LoadingSpinner /> : <ComponentContent />}
```

### Data Validation
Input validation pattern used across forms:

```typescript
const validateInput = (value: string | number, type: string): boolean => {
    // Validation logic
    return isValid;
};
```

## State Management
Components use React hooks for state management:
- useState for local state
- useEffect for side effects
- useContext for shared state

## Styling
Components use CSS modules for styling:
```tsx
import styles from './ComponentName.module.css';
``` 