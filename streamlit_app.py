import streamlit as st
import openai
import os
from typing import Optional

# Configure OpenAI
openai.api_key = st.secrets["OPENAI_API_KEY"]

JEEP_SPECS = {
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

def main():
    st.title("2009 Jeep Wrangler Technical Support")
    st.subheader("Get solutions for common technical issues and maintenance procedures")
    
    # Vehicle Specs Section
    if st.sidebar.button("Show Vehicle Specs"):
        st.header("Vehicle Specifications")
        st.write(f"Engine: {JEEP_SPECS['engine_type']}")
        st.write(f"Horsepower: {JEEP_SPECS['horsepower']}")
        st.write(f"Torque: {JEEP_SPECS['torque']}")
        st.write(f"Drivetrain: {JEEP_SPECS['drivetrain']}")
        st.write(f"Transmission: {JEEP_SPECS['transmission']}")
        st.write(f"Fuel Capacity: {JEEP_SPECS['fuel_capacity']}")
        st.write(f"Fuel Economy: {JEEP_SPECS['fuel_economy_city']}/{JEEP_SPECS['fuel_economy_hwy']} (City/Highway)")

    # Question/Answer Section
    st.header("Technical Support Assistant")
    st.write("Describe the issue you're experiencing or ask about a specific repair procedure.")
    question = st.text_area("What technical issue can I help you with today?")
    
    if st.button("Get Solution"):
        if question:
            # Try getting AI response first
            response = get_ai_response(question)
            if not response:
                # Fallback to predefined responses
                response = get_jeep_advice(question.lower())
            st.write("Technical Solution:")
            st.write(response)

def get_jeep_advice(question: str) -> str:
    """Comprehensive keyword-based response system."""
    if "click" in question or "turn" in question:
        return """Clicking When Turning Diagnosis:
        1. CV Joints:
          - Check CV boots for tears
          - Listen for clicking that increases with speed
          - Inspect for grease leakage
        
        2. Ball Joints:
          - Jack up front end safely
          - Check for play in wheel
          - Inspect rubber boots
        
        3. Power Steering:
          - Check fluid level and condition
          - Listen for pump noise
          - Inspect belt tension"""
    
    # Check predefined responses first
    if "oil" in question:
        return """Oil Change Procedure:
        1. Warm engine for 2-3 minutes
        2. Locate drain plug under oil pan
        3. Place drain pan and remove plug
        4. Remove old filter with filter wrench
        5. Install new filter (hand-tight + 1/4 turn)
        6. Replace drain plug (25 ft-lbs torque)
        7. Add 6 quarts of 5W-30 oil
        8. Start engine and check for leaks
        
        Warning Signs:
        - Low oil pressure light
        - Engine knocking
        - Dark, dirty oil on dipstick"""
    
    elif "tire" in question:
        return """Tire Troubleshooting:
        1. Uneven Wear:
           - Check and adjust alignment
           - Rotate tires immediately
           - Inspect suspension components
        
        2. Vibration:
           - Balance all tires
           - Check for bent wheels
           - Inspect for separated tread
        
        3. Pressure Issues:
           - Check when cold
           - Set to 32 PSI
           - Inspect for slow leaks"""
    
    elif "transmission" in question:
        return """Transmission Diagnostics:
        1. Grinding Gears (Manual):
           - Check clutch adjustment
           - Verify fluid level
           - Inspect synchronizers
        
        2. Slipping (Automatic):
           - Check fluid level and condition
           - Inspect for leaks
           - Scan for error codes
        
        3. Hard Shifting:
           - Verify correct fluid type
           - Check shift linkage
           - Inspect shift solenoids"""
    
    elif "brake" in question:
        return """Brake System Diagnostics:
        1. Squealing:
           - Check pad thickness
           - Inspect rotors for scoring
           - Clean brake hardware
        
        2. Soft Pedal:
           - Bleed brake system
           - Check for line leaks
           - Inspect master cylinder
        
        3. Pulling:
           - Compare pad wear
           - Check caliper operation
           - Inspect brake lines"""
    
    return """Common Technical Issues:
    1. Engine Performance:
       - Check spark plugs
       - Inspect fuel system
       - Verify timing
    
    2. Electrical:
       - Test battery
       - Check alternator
       - Inspect grounds
    
    3. Suspension:
       - Inspect shocks/struts
       - Check ball joints
       - Test steering components
    
    Please describe your specific issue for detailed repair steps."""

def get_ai_response(question: str) -> Optional[str]:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": """You are a technical expert specializing in the 2009 Jeep Wrangler 
                 with the 3.8L V6 engine (JK Platform). You understand all common and edge-case issues. Focus on:
                 - Specific technical solutions
                 - Step-by-step repair procedures
                 - Required tools and parts
                 - Safety precautions
                 - Common pitfalls to avoid
                 
                 Known Edge Cases:
                 1. Death Wobble Combinations:
                    - Track bar + steering box issues
                    - Ball joints + tire balance
                    - Multiple suspension components
                 
                 2. Complex Electrical:
                    - TIPM-related multiple system failures
                    - Intermittent starting issues
                    - CAN bus communication errors
                 
                 3. Critical Safety Issues:
                    - Frame rust in specific locations
                    - Brake line deterioration patterns
                    - Steering component failure signs
                 
                 4. JK-Specific Issues:
                    - 3.8L oil consumption patterns
                    - NSG370 transmission quirks
                    - Known factory defects and recalls
                 
                 5. Environmental Factors:
                    - High altitude fuel mixture issues
                    - Extreme weather operating procedures
                    - Water crossing damage patterns
                 
                 Always consider:
                 1. Multiple related system failures
                 2. Safety implications of advice given
                 3. When to recommend professional service
                 4. Factory service bulletin information
                 5. Common misdiagnosis patterns"""},
                {"role": "user", "content": question}
            ],
            temperature=0.3,
            max_tokens=1000
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        st.error(f"Could not get technical response: {str(e)}")
        return None

if __name__ == "__main__":
    main() 