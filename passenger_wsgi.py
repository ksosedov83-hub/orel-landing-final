import sys
import os

# Add your project directory to the sys.path
INTERP = os.path.join(os.environ['HOME'], '.virtualenvs', 'venv', 'bin', 'python')
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Add the app directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

from app import app as application
