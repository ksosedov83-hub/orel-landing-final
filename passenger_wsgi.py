import sys
import os

# Добавляем текущую директорию в путь Python
INTERP = os.path.join(os.environ['HOME'], '.virtualenv', 'orel-landing', 'bin', 'python3')
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

sys.path.insert(0, os.path.dirname(__file__))

from app import app as application
