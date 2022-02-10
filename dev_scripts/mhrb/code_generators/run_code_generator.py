#!/usr/bin/env python3

"""
Filename: run_code_generator.py
Author:   simshadows <contact@simshadows.com>

Runs the code generator.
"""

import os

from skills import generate_and_get_skills
from decorations import generate_and_get_decorations

print(f"Current working directory: {os.getcwd()}")

skills = generate_and_get_skills()
print(f"Discovered {len(skills)} skills.")

decos = generate_and_get_decorations()
print(f"Discovered {len(decos)} decorations.")

