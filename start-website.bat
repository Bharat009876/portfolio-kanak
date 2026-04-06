@echo off
cd /d "%~dp0"
echo.
echo Starting portfolio site...
echo Open in your browser: http://127.0.0.1:5173
echo Press Ctrl+C to stop.
echo.
npx --yes serve -l 5173 .
if errorlevel 1 (
  echo npx failed, trying Python on port 8765...
  python -m http.server 8765
)
pause
