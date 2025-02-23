from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    vehicles = relationship("Vehicle", back_populates="owner")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    vin = Column(String, unique=True, index=True)
    make = Column(String)
    model = Column(String)
    year = Column(Integer)
    # Engine details
    engine_type = Column(String)  # e.g., "3.8L OHV 12-VALVE SMPI V6"
    horsepower = Column(String)   # e.g., "202 @ 5200 RPM"
    torque = Column(String)       # e.g., "237 @ 4000 RPM"
    
    # Performance specs
    max_towing = Column(String)   # e.g., "1,000 lbs"
    drivetrain = Column(String)   # e.g., "4-Wheel Drive"
    
    # Transmission
    transmission = Column(String) # e.g., "6-Speed Manual"
    
    # Fuel
    fuel_capacity = Column(String)  # e.g., "18.6 gal"
    fuel_economy_city = Column(Integer)  # e.g., 15
    fuel_economy_hwy = Column(Integer)   # e.g., 19

    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner = relationship("User", back_populates="vehicles") 