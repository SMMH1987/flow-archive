@echo off
cd /d "%~dp0site"
start "" http://localhost:8767/
python -m http.server 8767
