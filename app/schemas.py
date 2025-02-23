from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Vehicle schemas
class VehicleBase(BaseModel):
    vin: str
    make: str
    model: str
    year: int
    # Engine details
    engine_type: Optional[str] = None
    horsepower: Optional[str] = None
    torque: Optional[str] = None
    # Performance specs
    max_towing: Optional[str] = None
    drivetrain: Optional[str] = None
    # Transmission
    transmission: Optional[str] = None
    # Fuel
    fuel_capacity: Optional[str] = None
    fuel_economy_city: Optional[int] = None
    fuel_economy_hwy: Optional[int] = None

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Token schema
class Token(BaseModel):
    access_token: str
    token_type: str 