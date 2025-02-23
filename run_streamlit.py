import os
import sys

# Add the project root to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Now run the streamlit app
import streamlit.web.bootstrap
if __name__ == "__main__":
    streamlit.web.bootstrap.run("app/streamlit_app.py", "", [], []) 