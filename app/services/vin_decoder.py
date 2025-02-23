import httpx
from app.config import settings
from typing import Dict, Any

async def decode_vin(vin: str) -> Dict[str, Any]:
    """Return hardcoded specs for 2009 Jeep Wrangler."""
    if vin != settings.JEEP_VIN:
        raise ValueError("Only 2009 Jeep Wrangler VIN is supported")
    return settings.JEEP_SPECS 