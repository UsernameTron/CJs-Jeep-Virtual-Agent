JEEP_JK_DATA = {
    "Factory Recalls": {
        "08V441000": "Front Control Arm Issues",
        "09V146000": "Brake Line Corrosion",
        "10V177000": "Transmission Temperature",
    },
    
    "Common TSBs": {
        "08-020-08": "Oil Consumption Guidelines",
        "08-049-08": "Transmission Shift Quality",
        "09-001-09": "Engine Misfire Detection",
    },
    
    "Known Defects": {
        "TIPM": {
            "symptoms": ["Random electrical issues", "Fuel pump failure", "Starting problems"],
            "diagnostic_steps": ["Check fuel pressure", "Scan for codes", "Test fuel pump relay"],
            "fix": "TIPM replacement or repair"
        },
        "Oil Consumption": {
            "symptoms": ["Oil loss between changes", "No visible leaks"],
            "diagnostic_steps": ["Oil consumption test", "Compression test", "Leak down test"],
            "fix": "Valve guide seals, rings, or PCV system"
        }
    },
    
    "Safety Critical Areas": {
        "Frame": ["Front control arm mounts", "Rear shock mounts", "Track bar brackets"],
        "Steering": ["Track bar", "Tie rod ends", "Steering box mount"],
        "Brakes": ["Hard line routing", "Flexible hose condition", "Master cylinder function"]
    },
    
    "Maintenance Intervals": {
        "3000_miles": ["Oil change", "Tire rotation"],
        "6000_miles": ["Transfer case fluid check", "Brake inspection"],
        "12000_miles": ["Differential fluid change", "Transmission fluid check"],
        "30000_miles": ["Spark plugs", "Transmission fluid change"],
        "60000_miles": ["Timing chain inspection", "Valve adjustment check"]
    }
}

DIAGNOSTIC_TREES = {
    "death_wobble": {
        "initial_checks": ["Tire balance", "Track bar", "Ball joints"],
        "secondary_checks": ["Control arms", "Steering stabilizer", "Frame mounts"],
        "tertiary_checks": ["Steering box", "Alignment", "Wheel bearings"]
    },
    
    "no_start": {
        "initial_checks": ["Battery voltage", "Starter signal", "Fuel pressure"],
        "secondary_checks": ["TIPM function", "Security system", "Crankshaft sensor"],
        "tertiary_checks": ["Compression", "Timing chain", "PCM function"]
    }
}

TOOL_REQUIREMENTS = {
    "basic_maintenance": [
        "Oil filter wrench - 93mm",
        "Torque wrench - 10-150 ft-lbs",
        "32mm axle socket",
        "T40 Torx bit"
    ],
    
    "advanced_repairs": [
        "Ball joint press",
        "Steering wheel puller",
        "Seal puller kit",
        "Transmission jack"
    ]
} 