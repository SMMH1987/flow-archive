@echo off
REM Command Center: builds and starts the container, then opens the browser.
cd /d "%~dp0"
set CODE_ROOT=D:\AI\Claude-Ai 1\Code
docker compose up -d --build
start http://127.0.0.1:8090
