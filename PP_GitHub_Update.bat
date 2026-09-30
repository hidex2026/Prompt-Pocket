@echo off
setlocal

cd /d "%~dp0"
echo Prompt Pocket GitHub Update
echo Working directory: %CD%
echo.

where git >nul 2>&1
if errorlevel 1 goto :git_missing

echo [1/3] Staging changes...
git add -A
if errorlevel 1 goto :failed

git diff --cached --quiet
if not errorlevel 1 goto :push

echo [2/3] Creating commit...
git commit -m "Update Prompt Pocket"
if errorlevel 1 goto :failed

:push
echo [3/3] Pushing to GitHub...
git push origin main
if errorlevel 1 goto :failed

echo.
echo GitHub update completed.
pause
exit /b 0

:git_missing
echo.
echo ERROR: Git was not found in PATH.
pause
exit /b 1

:failed
echo.
echo ERROR: GitHub update failed. See the error above.
pause
exit /b 1
