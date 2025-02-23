from fastapi import FastAPI
from app.config import settings
from app.routers import auth, vehicles
from app.database import engine
from app import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Jeep Specs API",
        "docs_url": "/docs",
        "openapi_url": f"{settings.API_V1_STR}/openapi.json"
    }

# Include routers
app.include_router(
    auth.router,
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["authentication"]
)

app.include_router(
    vehicles.router,
    prefix=f"{settings.API_V1_STR}/vehicles",
    tags=["vehicles"]
) 