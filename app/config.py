from pydantic_settings import BaseSettings
from typing import Optional, Dict, Any, ClassVar
from app.resources.technical_data import JEEP_JK_DATA, DIAGNOSTIC_TREES, TOOL_REQUIREMENTS

class Settings(BaseSettings):
    # Database configuration
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/jeep_specs"
    
    # API Configuration
    OPENAI_API_KEY: str
    
    # Vehicle Configuration - 2009 Jeep Wrangler
    JEEP_VIN: str = "1J4FA24179L771972"
    JEEP_SPECS: ClassVar[Dict[str, Any]] = {
        "make": "Jeep",
        "model": "Wrangler",
        "year": 2009,
        "engine_type": "3.8L OHV 12-VALVE SMPI V6",
        "horsepower": "202 @ 5200 RPM",
        "torque": "237 @ 4000 RPM",
        "max_towing": "1,000 lbs",
        "drivetrain": "4-Wheel Drive",
        "transmission": "6-Speed Manual",
        "fuel_capacity": "18.6 gal",
        "fuel_economy_city": 15,
        "fuel_economy_hwy": 19
    }
    JEEP_TECHNICAL_DATA: ClassVar[Dict] = JEEP_JK_DATA
    JEEP_DIAGNOSTIC_TREES: ClassVar[Dict] = DIAGNOSTIC_TREES
    JEEP_TOOLS: ClassVar[Dict] = TOOL_REQUIREMENTS
    
    # JWT configuration
    SECRET_KEY: str = "c11999b77c784b7c3325fd6c4f0ce44bf49fe2b0be6d3dc8f711e10b806bab24"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # API settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Jeep Specs API"

    class Config:
        env_file = "app/.env"
        case_sensitive = True

settings = Settings()