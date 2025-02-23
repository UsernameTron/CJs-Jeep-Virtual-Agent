from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import crud, models, schemas
from app.dependencies import get_db, get_current_user
from app.services.vin_decoder import decode_vin

router = APIRouter()

@router.get("/decode/{vin}", response_model=dict)
async def decode_vehicle_vin(
    vin: str,
    current_user: models.User = Depends(get_current_user)
):
    """Decode a VIN number using NHTSA API."""
    return await decode_vin(vin)

@router.post("/", response_model=schemas.Vehicle)
async def create_vehicle(
    vehicle: schemas.VehicleCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Check if user already has a vehicle
    existing_vehicles = crud.get_vehicles(db)
    if existing_vehicles:
        raise HTTPException(
            status_code=400,
            detail="User already has a vehicle registered"
        )
    
    # Get vehicle details from VIN
    vin_details = await decode_vin(vehicle.vin)
    vehicle_data = {**vehicle.model_dump(), **vin_details}
    
    db_vehicle = crud.get_vehicle_by_vin(db, vin=vehicle.vin)
    if db_vehicle:
        raise HTTPException(
            status_code=400,
            detail="VIN already registered"
        )
    return crud.create_vehicle(db=db, vehicle=schemas.VehicleCreate(**vehicle_data), owner_id=current_user.id)

@router.get("/", response_model=List[schemas.Vehicle])
def read_vehicles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    return vehicles

@router.get("/{vehicle_id}", response_model=schemas.Vehicle)
def read_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_vehicle = crud.get_vehicle(db, vehicle_id=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_vehicle = crud.get_vehicle(db, vehicle_id=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(db_vehicle)
    db.commit()
    return {"ok": True} 