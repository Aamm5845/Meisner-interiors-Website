@echo off
echo ================================
echo   MEISNER INTERIORS DEPLOYMENT
echo ================================
echo.

echo [1/4] Adding changes to Git...
git add .

echo [2/4] Committing changes...
set /p message="Enter commit message (or press Enter for auto-message): "
if "%message%"=="" (
    set message=Update: %date% %time:~0,8%
)
git commit -m "%message%"

echo [3/4] Pushing to repository...
git push origin main

echo [4/4] Deployment complete!
echo.
echo Your changes are now live!
echo ================================
pause
