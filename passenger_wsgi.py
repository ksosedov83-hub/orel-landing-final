import sys
import os

# Add the application directory to the path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask application
from app import app as application

# Set production mode
application.config['DEBUG'] = False

# This is the entry point for Passenger
if __name__ == '__main__':
    application.run()
